import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import ordersRouter from './routes/orders.js';
import productsRouter from './routes/products.js';
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
app.use('/api/orders', ordersRouter);

const PORT = Number(process.env.PORT) || 5174;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/noorify';

async function start() {
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  // eslint-disable-next-line no-console
  console.log(`API connected to MongoDB`);
  try {
    const { seeded, count } = await seedProductsIfEmpty();
    // eslint-disable-next-line no-console
    console.log(`Products ready (seeded=${seeded}, count=${count})`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Product seeding skipped', err?.message || err);
  }
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start API', {
    message: err?.message,
    mongodbUri: MONGODB_URI,
    hint:
      "Start MongoDB locally or run 'npm run dev:db' to launch the in-memory development database.",
    stack: err?.stack,
  });
  process.exit(1);
});
