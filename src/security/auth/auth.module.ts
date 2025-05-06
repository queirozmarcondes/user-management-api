import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../jwt/constants';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/service/users.service';
import { usersProviders } from 'src/users/infra/providers/user.providers';
import { databaseProviders } from 'src/users/infra/database/database.providers';
import { UserRepository } from 'src/users/infra/repositories/user.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    UserRepository,
    ...usersProviders,
    ...databaseProviders,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
