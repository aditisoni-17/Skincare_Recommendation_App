import express from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import Product from '../../../server/models/Product.js';
import productsRouter from '../../../server/routes/products.js';

describe('products API integration', () => {
  let app;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      serverSelectionTimeoutMS: 5000,
    });

    app = express();
    app.use(express.json());
    app.use('/api/products', productsRouter);
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('creates a product with POST and persists it to the database', async () => {
    const payload = {
      id: 101,
      name: 'Barrier Repair Cream',
      price: 31.99,
      rating: 4.6,
      reviewCount: 18,
      image: 'https://example.com/barrier-repair-cream.jpg',
      description: 'Supports the skin barrier overnight.',
      category: 'moisturizers',
      isNew: true,
      isSale: false,
    };

    const response = await request(app).post('/api/products').send(payload);

    expect(response.status).toBe(201);
    expect(response.body.product).toMatchObject(payload);

    const savedProduct = await Product.findOne({ id: 101 }).lean();
    expect(savedProduct).toBeTruthy();
    expect(savedProduct.name).toBe('Barrier Repair Cream');
    expect(savedProduct.category).toBe('moisturizers');
  });

  it('returns stored products with GET and pagination metadata', async () => {
    await Product.create([
      {
        id: 201,
        name: 'Daily Gel Cleanser',
        price: 18.5,
        image: 'https://example.com/gel-cleanser.jpg',
        description: 'Light daily cleanser.',
        category: 'cleansers',
      },
      {
        id: 202,
        name: 'Night Renewal Serum',
        price: 42,
        image: 'https://example.com/night-serum.jpg',
        description: 'Overnight serum for smoother skin.',
        category: 'serums',
      },
    ]);

    const response = await request(app).get('/api/products?limit=1&page=1');

    expect(response.status).toBe(200);
    expect(response.body.pagination).toEqual({
      page: 1,
      limit: 1,
      total: 2,
      totalPages: 2,
    });
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0]).toMatchObject({
      id: 201,
      name: 'Daily Gel Cleanser',
    });
  });
});
