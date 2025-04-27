import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';  // Importando o bcryptjs
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Gerando o salt para o hash da senha
    const salt = await bcrypt.genSalt(10);

    // Gerando o hash da senha
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Substituindo a senha no DTO com a senha hashada
    createUserDto.password = hashedPassword;

    // Criando o usuário com o DTO atualizado (com senha hashada)
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
