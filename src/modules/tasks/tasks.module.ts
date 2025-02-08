import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { CreateTaskService } from './services/create-task-service/create-task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetAllTasksService } from './services/get-all-tasks-service/get-all-tasks.service';
import { DecodeTokenService } from '../auth/services/decode-token-service/decode-token.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [CreateTaskService, GetAllTasksService, DecodeTokenService],
})
export class TasksModule {}
