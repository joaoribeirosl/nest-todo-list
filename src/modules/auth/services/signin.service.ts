import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@module/prisma/services/prisma.service';

interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  name: string;
  token: string;
}

@Injectable()
export class SigninService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async execute({ email, password }: ILogin) {
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (!userExists) throw new NotFoundException('User not found!');
    const passwordConfirmed = await compare(password, userExists.password);
    if (!passwordConfirmed) throw new ConflictException('Incorrect password!');
    const token = await this.jwtService.signAsync({ id: userExists.id });
    return { name: userExists.name, token } as ILoginResponse;
  }
}
