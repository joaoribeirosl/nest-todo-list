import { Injectable, NotFoundException } from '@nestjs/common';
import { DecodeTokenService } from 'src/modules/auth/services/decode-token-service/decode-token.service';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';

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
