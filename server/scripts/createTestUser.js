import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from '../models/User.js';

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/noorify';

const TEST_USER = {
  name: 'Noorify Test User',
  email: 'test@noorify.com',
  phone: '',
  password: '123456',
  skinType: 'normal',
  skinConcerns: 'testing',
  allergies: '',
};

async function run() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

  const passwordHash = await bcrypt.hash(TEST_USER.password, 10);

  const user = await User.findOneAndUpdate(
    { email: TEST_USER.email },
    {
      name: TEST_USER.name,
      email: TEST_USER.email,
      phone: TEST_USER.phone,
      passwordHash,
      skinType: TEST_USER.skinType,
      skinConcerns: TEST_USER.skinConcerns,
      allergies: TEST_USER.allergies,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  // eslint-disable-next-line no-console
  console.log('Test user ready:', {
    id: user._id.toString(),
    email: user.email,
    password: TEST_USER.password,
  });
}

run()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to create test user:', {
      message: err?.message,
      mongodbUri: MONGODB_URI,
      stack: err?.stack,
    });
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
