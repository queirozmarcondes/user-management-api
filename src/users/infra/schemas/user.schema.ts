import { Schema, Document } from 'mongoose';

// Definindo o esquema do usuário
export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: null },
    roles: { type: [String], default: ['user'] },
  },
  {
    timestamps: true, // Garante que createdAt e updatedAt sejam adicionados automaticamente
  },
);

// Definindo a interface do usuário
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  photo?: string | null;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
