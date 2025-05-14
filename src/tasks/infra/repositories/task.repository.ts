import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema'; // Interface da Task
import { CreateTaskDto } from '../../dto/create-task.dto'; // DTO de criação
import { UpdateTaskDto } from '../../dto/update-task.dto'; // DTO de atualização

@Injectable()
export class TaskRepository {
  constructor(
    @Inject('TASK_MODEL') private readonly taskModel: Model<Task>, // Injetando o modelo Task
  ) {}

  // Cria uma nova tarefa
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  // Busca todas as tarefas
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  // Busca uma tarefa pelo ID
  async findOneById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  // Atualiza uma tarefa
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  // Remove uma tarefa
  async remove(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  // (Opcional) Busca tarefas de um usuário específico
  async findByUserId(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }
}
