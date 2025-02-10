import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { CreateTaskService } from './services/create-task-service/create-task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetAllTasksService } from './services/get-all-tasks-service/get-all-tasks.service';
import { DecodeTokenService } from '../auth/services/decode-token-service/decode-token.service';
import { GetAllTasksByUserIdService } from './services/get-all-tasks-by-user-id/get-all-tasks-by-user-id.service';
import { DeleteTaskByIdService } from './services/delete-task-by-id/delete-task-by-id.service';
import { UpdateTaskByIdService } from './services/update-task-by-id/update-task-by-id.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [
    CreateTaskService,
    GetAllTasksService,
    DecodeTokenService,
    GetAllTasksByUserIdService,
    DeleteTaskByIdService,
    UpdateTaskByIdService,
  ],
})
export class TasksModule {}
