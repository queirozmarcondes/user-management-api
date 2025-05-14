import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule], // Importa o módulo de configuração
  providers: [...databaseProviders], // Adiciona os providers do banco de dados
  exports: ['DATABASE_CONNECTION'], // Exporta a conexão com o banco de dados para uso em outros módulos
})
export class DatabaseModule {}
