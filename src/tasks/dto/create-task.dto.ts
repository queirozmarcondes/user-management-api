// src/tasks/dto/create-task.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada da tarefa',
    example: 'Revisar os módulos de injeção de dependência e providers',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Indica se a tarefa está concluída',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiProperty({
    description: 'ID do usuário que criou a tarefa',
    example: '663df7f2c16e2b81a1234567',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
