import Product from '../models/Product.js';
import { PRODUCTS } from '../lib/products.js';

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) return { seeded: false, count };

  await Product.insertMany(PRODUCTS, { ordered: false });
  const after = await Product.countDocuments();
  return { seeded: true, count: after };
}

