import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { usersProviders } from './infra/providers/user.providers';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, ...databaseProviders],
})
export class UsersModule {}
