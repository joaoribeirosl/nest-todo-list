import { PrismaService } from '@module/prisma/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTaskByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<boolean> {
    const task = await this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) throw new NotFoundException('Task not found!');
    await this.prisma.task.delete({
      where: { id: Number(id) },
    });
    return true;
  }
}
