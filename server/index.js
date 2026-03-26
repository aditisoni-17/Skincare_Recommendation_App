import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import ordersRouter from './routes/orders.js';
import productsRouter from './routes/products.js';
import recommendRouter from './routes/recommend.js';
import { seedProductsIfEmpty } from './services/seedProducts.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) || true,
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'noorify-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/recommend', recommendRouter);
app.use('/api/orders', ordersRouter);

const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/noorify';

async function start() {
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  // eslint-disable-next-line no-console
  console.log('API connected to MongoDB');

  try {
    const { seeded, count } = await seedProductsIfEmpty();
    // eslint-disable-next-line no-console
    console.log(`Products ready (seeded=${seeded}, count=${count})`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Product seeding skipped', error?.message || error);
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start API', {
    message: error?.message,
    stack: error?.stack,
    mongodbUri: MONGODB_URI,
  });
  process.exit(1);
});
