import { Schema, Document } from 'mongoose';

// Definindo o esquema da tarefa
export const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    isCompleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Relacionamento com o usuário
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
  },
);

// Definindo a interface da tarefa
export interface Task extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
