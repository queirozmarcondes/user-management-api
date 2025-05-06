import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';
import { User } from '../infra/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository, // Injetando o repositório
  ) {}

  // Método para criar um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Gerando o salt para o hash da senha
    const salt = await bcrypt.genSalt(10);

    // Gerando o hash da senha
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Substituindo a senha no DTO com a senha hashada
    createUserDto.password = hashedPassword;

    // Criando o usuário no repositório
    return this.userRepository.create(createUserDto);
  }

  // Método para obter todos os usuários
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // Método para encontrar um usuário pelo ID
  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneById(id);
  }

  // Método para encontrar um usuário pelo e-mail
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  // Método para atualizar um usuário
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userRepository.update(id, updateUserDto);
  }

  // Método para remover um usuário
  async remove(id: string): Promise<User | null> {
    return this.userRepository.remove(id);
  }
}
