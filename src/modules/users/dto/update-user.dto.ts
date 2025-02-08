import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  idUser: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
