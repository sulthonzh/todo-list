import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy groceries',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Buy milk, eggs, and bread from the store',
  })
  @IsString()
  description: string;
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy groceries',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Buy milk, eggs, and bread from the store',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
