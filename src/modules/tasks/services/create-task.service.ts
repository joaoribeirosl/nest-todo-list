import { DecodeTokenService } from '@module/auth/services/decode-token.service';
import { PrismaService } from '@module/prisma/services/prisma.service';
import { CreateTaskDto } from '@module/tasks/dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface ICreateTaskRequest {
  createdTask: CreateTaskDto;
  token: string;
}
export interface IResponse {
  userId: number;
  taskId: number;
  createdTask: CreateTaskDto;
}
@Injectable()
export class CreateTaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly decodeTokenService: DecodeTokenService,
  ) {}

  async execute(
    createdTask: CreateTaskDto,
    token: string,
  ): Promise<IResponse | undefined> {
    const userExists = await this.decodeTokenService.decodeToken(token);
    if (!userExists) throw new NotFoundException();

    const task = await this.prisma.task.create({
      data: {
        title: createdTask.title,
        description: createdTask.description,
        userId: userExists.id,
      },
    });

    return {
      userId: userExists.id,
      taskId: task.id,
      createdTask: createdTask,
    } as IResponse;
  }
}
