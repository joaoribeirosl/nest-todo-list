import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create_task.dto';
import { CreateTaskService } from '../services/create-task-service/create-task.service';
import { GetAllTasksService } from '../services/get-all-tasks-service/get-all-tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getAllTasksService: GetAllTasksService,
  ) {}

  @Post()
  async create(@Body() body: CreateTaskDto) {
    return this.createTaskService.execute(body);
  }

  @Get()
  async index() {
    return await this.getAllTasksService.execute();
  }
}
