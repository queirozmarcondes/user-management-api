import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskRepository } from '../infra/repositories/task.repository';
import { UserRepository } from 'src/users/infra/repositories/user.repository';
import { Task } from '../infra/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: TaskRepository, // sem @Inject()
    private readonly userRepository: UserRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { userId } = createTaskDto; // Supondo que o DTO tenha o userId
    const userExists = await this.userRepository.findOneById(userId); // Verifica se o usuário existe

    if (!userExists) {
      throw new Error('User not found'); // Lança um erro caso o usuário não exista
    }

    // Se o usuário existe, cria a tarefa
    return this.taskRepository.create(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskRepository.findOneById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: string): Promise<Task | null> {
    return this.taskRepository.remove(id);
  }
}
