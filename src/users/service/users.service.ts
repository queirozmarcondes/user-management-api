import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';
import { User } from '../infra/schemas/user.schema';
import { LoggerService } from 'src/log/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService, // Injete o LoggerService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Iniciando criação de usuário'); // Log para indicar que o processo começou

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;

    const createdUser = await this.userRepository.create(createUserDto);

    this.logger.log(`Usuário criado com ID: ${createdUser.id}`); // Log para sucesso

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Buscando todos os usuários'); // Log de busca
    const users = await this.userRepository.findAll();
    this.logger.log(`Encontrados ${users.length} usuários`); // Log para exibir o número de usuários encontrados
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    this.logger.log(`Buscando usuário com ID: ${id}`);
    const user = await this.userRepository.findOneById(id);
    if (user) {
      this.logger.log(`Usuário encontrado: ${user.name}`);
    } else {
      this.logger.warn(`Usuário não encontrado com ID: ${id}`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Buscando usuário com email: ${email}`);
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      this.logger.log(`Usuário encontrado: ${user.name}`);
    } else {
      this.logger.warn(`Usuário não encontrado com email: ${email}`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    this.logger.log(`Atualizando usuário com ID: ${id}`);

    // Verifica se o campo password foi atualizado e faz o hash da nova senha
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10); // Gerar salt
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt); // Hash da senha
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);

    if (updatedUser) {
      this.logger.log(`Usuário atualizado com sucesso: ${updatedUser.id}`);
    } else {
      this.logger.warn(`Erro ao atualizar usuário com ID: ${id}`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User | null> {
    this.logger.log(`Removendo usuário com ID: ${id}`);
    const deletedUser = await this.userRepository.remove(id);
    if (deletedUser) {
      this.logger.log(`Usuário removido com sucesso: ${deletedUser.id}`);
    } else {
      this.logger.warn(`Erro ao remover usuário com ID: ${id}`);
    }
    return deletedUser;
  }
}
