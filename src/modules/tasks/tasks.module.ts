import { Module } from '@nestjs/common';
import { EditTaskService } from './services/edit-task-service/edit-task/edit-task.service';
import { CreateTaskService } from './services/create-task-service/create-task/create-task.service';
import { TaskController } from './controllers/task.controller';

@Module({
  providers: [EditTaskService, CreateTaskService],
  controllers: [TaskController],
})
export class TasksModule {}
