import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/dto/create_task.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class CreateTaskService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: CreateTaskDto) {
    return this.prisma.task.create({
      data: { title: payload.title, description: payload.description },
    });
  }
}
