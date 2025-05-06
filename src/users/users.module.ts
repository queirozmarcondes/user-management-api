import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { UserRepository } from './infra/repositories/user.repository';
import { usersProviders } from './infra/providers/user.providers';
import { DatabaseModule } from './infra/database/database.module';
@Module({
  imports: [DatabaseModule], // Importa o módulo de conexão com o banco de dados
  controllers: [UsersController],
  providers: [
    UsersService,           // Serviço de usuários
    UserRepository,         // Repositório de usuários
    ...usersProviders,      // Providers do modelo de usuário
  ],
})
export class UsersModule {}
