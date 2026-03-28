import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/User.js';

const router = express.Router();

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function sanitizeString(value = '') {
  return String(value).trim();
}

function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    skinType: user.skinType,
    skinConcerns: user.skinConcerns,
    allergies: user.allergies,
  };
}

function createToken(user) {
  return jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  );
}

function validateSignupPayload(payload = {}) {
  const errors = [];

  const name = sanitizeString(payload.name);
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || '');
  const phone = sanitizeString(payload.phone);
  const skinType = sanitizeString(payload.skinType);
  const skinConcerns = sanitizeString(payload.skinConcerns);
  const allergies = sanitizeString(payload.allergies);

  if (!name) errors.push('Name is required.');
  if (!email) errors.push('Email is required.');
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Enter a valid email address.');
  if (!password) errors.push('Password is required.');
  else if (password.length < 6) errors.push('Password must be at least 6 characters.');

  return {
    isValid: errors.length === 0,
    errors,
    data: { name, email, phone, password, skinType, skinConcerns, allergies },
  };
}

function validateLoginPayload(payload = {}) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || '');
  const errors = [];

  if (!email) errors.push('Email is required.');
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Enter a valid email address.');

  if (!password) errors.push('Password is required.');

  return {
    isValid: errors.length === 0,
    errors,
    data: { email, password },
  };
}

router.post('/signup', async (req, res) => {
  try {
    const { isValid, errors, data } = validateSignupPayload(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errors[0], errors });
    }

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash,
      skinType: data.skinType,
      skinConcerns: data.skinConcerns,
      allergies: data.allergies,
    });

    return res.status(201).json({
      token: createToken(user),
      user: serializeUser(user),
    });
  } catch (err) {
    console.error('Signup failed:', err);

    if (err?.code === 11000) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    if (err instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(err.errors || {}).map((error) => error.message);
      return res.status(400).json({
        error: messages[0] || 'Invalid signup data.',
        errors: messages,
      });
    }

    return res.status(500).json({ error: 'Unable to create account right now.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { isValid, errors, data } = validateLoginPayload(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errors[0], errors });
    }

    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password.' });

    return res.json({
      token: createToken(user),
      user: serializeUser(user),
    });
  } catch (err) {
    console.error('Login failed:', err);
    return res.status(500).json({ error: 'Unable to sign in right now.' });
  }
});

export default router;
