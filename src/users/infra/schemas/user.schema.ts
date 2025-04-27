import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: null },
    roles: { type: [String], default: ['user'] },
  },
  {
    timestamps: true,
  },
);
