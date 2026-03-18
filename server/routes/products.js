import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await Product.find({}).sort({ id: 1 }).lean();
  res.json({
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      rating: p.rating,
      reviewCount: p.reviewCount,
      image: p.image,
      description: p.description,
      category: p.category,
      isNew: p.isNew,
      isSale: p.isSale,
    })),
  });
});

export default router;

