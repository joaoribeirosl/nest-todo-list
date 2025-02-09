import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'user id',
    example: '1',
  })
  @IsNotEmpty()
  idUser: number;

  @ApiProperty({
    description: 'username',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email',
    example: 'test@mail.co',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
