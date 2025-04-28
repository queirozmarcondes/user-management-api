import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth-dto';
// import { LoggerService } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    // private readonly logger: LoggerService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso. Retorna o token JWT.',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiBody({ type: AuthDto })
  async login(@Body() authDto: AuthDto) {
    this.logger.log('Requisição de login recebida');
    try {
      const user = await this.authService.validateUser(
        authDto.email,
        authDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      const result = this.authService.login(user);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      throw new UnauthorizedException('Erro ao tentar autenticar');
    }
  }
}
