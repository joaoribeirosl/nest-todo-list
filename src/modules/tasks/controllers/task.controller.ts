import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create_task.dto';
import { CreateTaskService } from '../services/create-task-service/create-task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskService: CreateTaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskService.execute(createTaskDto);
  }
}
