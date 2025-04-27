import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/service/users.service';
import { usersProviders } from 'src/users/infra/providers/user.providers';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, ...usersProviders, ...databaseProviders],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
