import { PrismaService } from '@module/prisma/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }
}
