import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameDto {
  @ApiProperty({
    description: 'The new username of the user',
    example: 'john.doe',
  })
  @IsString()
  username: string;
}
