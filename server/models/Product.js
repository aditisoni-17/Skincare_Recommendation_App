import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    isNew: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

export default mongoose.model('Product', ProductSchema);
