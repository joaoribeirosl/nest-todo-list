import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { GetAllTasksService } from './services/get-all-tasks.service';
import { DecodeTokenService } from '../auth/services/decode-token.service';
import { GetAllTasksByUserIdService } from './services/get-all-tasks-by-user-id.service';
import { DeleteTaskByIdService } from './services/delete-task-by-id.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateTaskService } from './services/create-task.service';
import { UpdateTaskByIdService } from './services/update-task-by-id.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
          ],
          queue: 'tasks_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
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
