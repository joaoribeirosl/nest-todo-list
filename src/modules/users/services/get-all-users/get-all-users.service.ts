import { PrismaService } from '@module/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.user.findMany();
  }
}
