import Product from '../models/Product.js';
import { PRODUCTS } from '../lib/products.js';

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(PRODUCTS, { ordered: false });
    const afterInsertCount = await Product.countDocuments();
    return { seeded: true, synced: false, count: afterInsertCount };
  }

  await Product.bulkWrite(
    PRODUCTS.map((product) => ({
      updateOne: {
        filter: { id: product.id },
        update: { $set: product },
        upsert: true,
      },
    }))
  );

  const afterSyncCount = await Product.countDocuments();
  return { seeded: false, synced: true, count: afterSyncCount };
}
