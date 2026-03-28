import express from 'express';
import Order from '../models/Order.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      orders: orders.map((o) => ({
        id: o._id.toString(),
        createdAt: o.createdAt,
        total: o.total,
        items: o.items,
        status: o.status,
        shipping: o.shipping,
      })),
    });
  } catch (error) {
    console.error('Failed to load orders:', error);
    return res.status(500).json({ error: 'Unable to load orders right now.' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  const { items, shipping } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items are required' });
  }
  if (
    !shipping?.firstName ||
    !shipping?.lastName ||
    !shipping?.email ||
    !shipping?.address ||
    !shipping?.city ||
    !shipping?.state ||
    !shipping?.zipCode
  ) {
    return res.status(400).json({ error: 'shipping fields are required' });
  }

  try {
    const total = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);

    const order = await Order.create({
      userId: req.user.id,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: Number(i.price) || 0,
        quantity: Number(i.quantity) || 1,
        image: i.image || '',
      })),
      total,
      shipping,
    });

    return res.status(201).json({
      order: {
        id: order._id.toString(),
        createdAt: order.createdAt,
        total: order.total,
        items: order.items,
        status: order.status,
        shipping: order.shipping,
      },
    });
  } catch (error) {
    console.error('Failed to create order:', error);
    return res.status(500).json({ error: 'Unable to create order right now.' });
  }
});

export default router;
