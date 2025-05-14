import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Module({
  imports: [ConfigModule], // Importa o módulo de configuração
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: [ConfigService], // Injeta o serviço de configuração
      useFactory: async (
        configService: ConfigService,
      ): Promise<typeof mongoose> => {
        const uri = configService.get<string>('DATABASE_URI');
        if (!uri) {
          throw new Error('DATABASE_URI is not defined in the configuration');
        }
        return mongoose.connect(uri);
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
