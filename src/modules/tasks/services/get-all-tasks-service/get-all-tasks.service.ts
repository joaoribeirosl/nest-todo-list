import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class GetAllTasksService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<Task[] | undefined> {
    const tasks = this.prisma.task.findMany({});
    if (!tasks) throw new NotFoundException();
    return tasks;
  }
}
