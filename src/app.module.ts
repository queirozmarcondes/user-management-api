import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './users/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, UsersModule, DatabaseModule
  ],
})
export class AppModule {}
