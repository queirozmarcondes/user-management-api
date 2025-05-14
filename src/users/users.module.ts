import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { UserRepository } from './infra/repositories/user.repository';
import { usersProviders } from './infra/providers/user.providers';
import { DatabaseModule } from './infra/database/database.module';
import { LoggerService } from 'src/log/logger.service';
@Module({
  imports: [DatabaseModule], // Importa o módulo de conexão com o banco de dados
  controllers: [UsersController],
  providers: [
    UsersService, // Serviço de usuários
    UserRepository,
    LoggerService, // Repositório de usuários
    ...usersProviders, // Providers do modelo de usuário
  ],
  exports: [...usersProviders], // Exporta os providers e o serviço de usuários para uso em outros módulos
})
export class UsersModule {}
