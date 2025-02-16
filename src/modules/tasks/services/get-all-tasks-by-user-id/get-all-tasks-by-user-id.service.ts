import { PrismaService } from '@module/prisma/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class GetAllTasksByUserIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string): Promise<Task[] | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) throw new NotFoundException('User not found!');

    const tasks = await this.prisma.task.findMany({
      where: { userId: Number(userId) },
    });
    if (!tasks) throw new NotFoundException('Task(s) not found!');
    return tasks;
  }
}
