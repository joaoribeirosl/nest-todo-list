import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { CreateTaskService } from './services/create-task-service/create-task.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [CreateTaskService],
})
export class TasksModule {}
