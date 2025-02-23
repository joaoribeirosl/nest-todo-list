import { PrismaService } from '@module/prisma/services/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class DecodeTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async decodeToken(token: string): Promise<User | null> {
    const decoded = this.jwtService.decode(token);

    if (!decoded || !decoded['id']) {
      throw new UnauthorizedException('Invalid token!');
    }

    const userId: number = decoded['id'];
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }
}
