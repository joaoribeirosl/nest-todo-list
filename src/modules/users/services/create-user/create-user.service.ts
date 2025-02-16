import { CreateUserDto } from '../../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@module/prisma/services/prisma.service';

export interface IResponse {
  name: string;
  email: string;
  token: string;
}
@Injectable()
export class CreateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserDto): Promise<IResponse | undefined> {
    const emailExists = await this.prisma.user.findUnique({ where: { email } });
    if (emailExists)
      throw new ConflictException('There is another user with this email!');
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const payload = { id: user.id, email };

    return {
      name,
      email,
      token: await this.jwtService.signAsync(payload),
    } as IResponse;
  }
}
