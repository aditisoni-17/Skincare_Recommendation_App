import express from 'express';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../../server/models/User.js';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../../../server/models/User.js', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('auth routes', () => {
  let app;
  let authRouter;

  beforeAll(async () => {
    ({ default: authRouter } = await import('../../../server/routes/auth.js'));
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRouter);
    jest.clearAllMocks();
  });

  it('logs in a valid user and returns a token', async () => {
    User.findOne.mockResolvedValue({
      _id: { toString: () => 'user-123' },
      name: 'Aditi',
      email: 'aditi@example.com',
      phone: '',
      skinType: 'dry',
      skinConcerns: 'redness',
      allergies: '',
      passwordHash: 'stored-hash',
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('signed-token');

    const response = await request(app).post('/api/auth/login').send({
      email: 'aditi@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: 'signed-token',
      user: {
        id: 'user-123',
        name: 'Aditi',
        email: 'aditi@example.com',
        phone: '',
        skinType: 'dry',
        skinConcerns: 'redness',
        allergies: '',
      },
    });
    expect(User.findOne).toHaveBeenCalledWith({ email: 'aditi@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'stored-hash');
  });

  it('rejects signup requests with an invalid email address', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      name: 'Aditi',
      email: 'invalid-email',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Enter a valid email address.',
      errors: ['Enter a valid email address.'],
    });
    expect(User.findOne).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });

  it('returns an authentication error when the password is wrong', async () => {
    User.findOne.mockResolvedValue({
      _id: { toString: () => 'user-123' },
      email: 'aditi@example.com',
      passwordHash: 'stored-hash',
    });
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post('/api/auth/login').send({
      email: 'aditi@example.com',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid email or password.' });
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
