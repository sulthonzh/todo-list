import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
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
