import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    passwordHash: { type: String, required: true },
    skinType: { type: String, default: '' },
    skinConcerns: { type: String, default: '' },
    allergies: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);

