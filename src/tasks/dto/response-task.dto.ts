// src/tasks/dto/response-task.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ResponseTaskDto {
  @ApiProperty({
    description: 'ID da tarefa',
    example: '663e052b0ebfc9483ad0de99',
  })
  id: string;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Revisar os conceitos de módulos e injeção de dependência',
  })
  description?: string;

  @ApiProperty({
    description: 'Indica se a tarefa está concluída',
    example: false,
  })
  isCompleted: boolean;

  @ApiProperty({
    description: 'ID do usuário dono da tarefa',
    example: '663df7f2c16e2b81a1234567',
  })
  userId: string;

  @ApiProperty({
    description: 'Data de criação da tarefa',
    example: '2025-05-13T21:24:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização da tarefa',
    example: '2025-05-13T21:30:00.000Z',
  })
  updatedAt: Date;
}
