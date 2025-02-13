import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskService } from '../services/create-task-service/create-task.service';
import { GetAllTasksService } from '../services/get-all-tasks-service/get-all-tasks.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetAllTasksByUserIdService } from '../services/get-all-tasks-by-user-id/get-all-tasks-by-user-id.service';
import { DeleteTaskByIdService } from '../services/delete-task-by-id/delete-task-by-id.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UpdateTaskByIdService } from '../services/update-task-by-id/update-task-by-id.service';
import { ApiCreateTask } from 'src/doc/task/create_task.documentation';
import { ApiGetAllTasks } from 'src/doc/task/get_all_tasks.documentation';
import { ApiGetTasksByUserId } from 'src/doc/task/get_task_by_id.documentation';
import { ApiDeleteTaskById } from 'src/doc/task/delete_task_by_id.documentation';
import { ApiUpdateTaskById } from 'src/doc/task/update_task_by_id.documentation';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getAllTasksService: GetAllTasksService,
    private readonly getAllTasksByUserId: GetAllTasksByUserIdService,
    private readonly deleteTaskByIdService: DeleteTaskByIdService,
    private readonly updateTaskByIdService: UpdateTaskByIdService,
  ) {}

  @ApiCreateTask()
  @Post()
  async create(@Body() body: CreateTaskDto, @Query('token') token: string) {
    return this.createTaskService.execute(body, token);
  }

  @ApiGetAllTasks()
  @Get()
  async index() {
    return await this.getAllTasksService.execute();
  }

  @ApiGetTasksByUserId()
  @Get(':id')
  async getAllById(@Param('id') param: string) {
    return await this.getAllTasksByUserId.execute(param);
  }

  @ApiDeleteTaskById()
  @Delete(':id')
  async delete(@Param('id') param: string) {
    return await this.deleteTaskByIdService.execute(param);
  }

  @ApiUpdateTaskById()
  @Put()
  async update(@Body() body: UpdateTaskDto) {
    return await this.updateTaskByIdService.execute(body);
  }
}
