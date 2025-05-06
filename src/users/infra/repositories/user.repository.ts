import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema'; // Importando a interface User
import { CreateUserDto } from '../../dto/create-user.dto'; // Importando o DTO de criação
import { UpdateUserDto } from '../../dto/update-user.dto'; // Importando o DTO de atualização

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<User>, // Injetando o modelo do Mongoose
  ) {}

  // Método para criar um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto); // Criando o usuário com o DTO
    return createdUser.save(); // Salvando no banco de dados e retornando o usuário criado
  }

  // Método para encontrar todos os usuários
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Retorna todos os usuários no banco de dados
  }

  // Método para encontrar um usuário pelo ID
  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec(); // Retorna o usuário pelo ID
  }

  // Método para encontrar um usuário pelo email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec(); // Retorna o usuário pelo email
  }

  // Método para atualizar um usuário
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true }) // Atualiza o usuário e retorna o novo documento
      .exec();
  }

  // Método para remover um usuário
  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec(); // Remove o usuário pelo ID
  }
}
