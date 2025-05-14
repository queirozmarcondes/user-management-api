import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService], // Agora injetamos o ConfigService
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
];
