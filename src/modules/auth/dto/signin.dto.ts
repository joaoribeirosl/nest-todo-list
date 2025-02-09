import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    description: 'email',
    example: 'test@mail.co',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 't3stp4ss!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
