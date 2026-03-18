import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: '' },
  },
  { _id: false }
);

const ShippingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    shipping: { type: ShippingSchema, required: true },
    status: { type: String, default: 'placed' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);

