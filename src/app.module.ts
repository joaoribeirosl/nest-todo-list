import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { PrismaService } from './prisma/services/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskController } from './modules/tasks/controllers/task.controller';
import { CreateTaskService } from './modules/tasks/services/create-task-service/create-task.service';
import { GetAllTasksService } from './modules/tasks/services/get-all-tasks-service/get-all-tasks.service';

@Module({
  imports: [TasksModule, PrismaModule],
  controllers: [AppController, TaskController],
  providers: [AppService, PrismaService, CreateTaskService, GetAllTasksService],
})
export class AppModule {}
