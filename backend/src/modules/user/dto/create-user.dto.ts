import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['user'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  roles: string[];
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['user'],
    isArray: true,
    required: false,
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  roles?: string[];
}
