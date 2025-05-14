import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './users/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './log/logger.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    TasksModule,
  ],
})
export class AppModule {}
