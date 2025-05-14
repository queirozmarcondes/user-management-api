import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TaskRepository } from './infra/repositories/task.repository';
import { DatabaseModule } from './infra/database/database.module';
import { tasksProviders } from './infra/providers/task.providers';
import { UserRepository } from 'src/users/infra/repositories/user.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, ...tasksProviders, UserRepository],
})
export class TasksModule {}
