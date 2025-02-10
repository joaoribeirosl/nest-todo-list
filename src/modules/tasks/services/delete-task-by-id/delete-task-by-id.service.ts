import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class DeleteTaskByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<boolean> {
    const task = await this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) throw new NotFoundException('Task not found!');
    const deletedUser = await this.prisma.task.delete({
      where: { id: Number(id) },
    });
    return !!deletedUser;
  }
}
