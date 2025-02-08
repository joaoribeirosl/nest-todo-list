import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.user.findMany();
  }
}
