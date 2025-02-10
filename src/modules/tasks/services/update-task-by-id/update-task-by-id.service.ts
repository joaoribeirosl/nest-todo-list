import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { UpdateTaskDto } from '../../dto/update-task.dto';

@Injectable()
export class UpdateTaskByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    idTask,
    title,
    description,
  }: UpdateTaskDto): Promise<boolean> {
    const task = await this.prisma.task.findUnique({ where: { id: idTask } });
    if (!task) throw new NotFoundException('Task not found!');

    await this.prisma.task.update({
      where: { id: idTask },
      data: { title, description },
    });

    return true;
  }
}
