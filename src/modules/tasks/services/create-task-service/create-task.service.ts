import { Injectable, NotFoundException } from '@nestjs/common';
import { DecodeTokenService } from 'src/modules/auth/services/decode-token-service/decode-token.service';
import { CreateTaskDto } from 'src/modules/tasks/dto/create_task.dto';
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

  async execute(payload: ICreateTaskRequest): Promise<IResponse | undefined> {
    const userExists = await this.decodeTokenService.decodeToken(payload.token);
    if (!userExists) throw new NotFoundException();

    const task = this.prisma.task.create({
      data: {
        title: payload.createdTask.title,
        description: payload.createdTask.description,
        userId: userExists?.id,
      },
    });

    return {
      userId: userExists?.id,
      taskId: (await task).id,
      createdTask: payload.createdTask,
    } as IResponse;
  }
}
