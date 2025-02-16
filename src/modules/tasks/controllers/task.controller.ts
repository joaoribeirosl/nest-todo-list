import { ApiCreateTask } from '@document/task/create_task.documentation';
import { ApiDeleteTaskById } from '@document/task/delete_task_by_id.documentation';
import { ApiGetAllTasks } from '@document/task/get_all_tasks.documentation';
import { ApiGetTasksByUserId } from '@document/task/get_task_by_id.documentation';
import { ApiUpdateTaskById } from '@document/task/update_task_by_id.documentation';
import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskService } from '../services/create-task-service/create-task.service';
import { DeleteTaskByIdService } from '../services/delete-task-by-id/delete-task-by-id.service';
import { GetAllTasksByUserIdService } from '../services/get-all-tasks-by-user-id/get-all-tasks-by-user-id.service';
import { GetAllTasksService } from '../services/get-all-tasks-service/get-all-tasks.service';
import { UpdateTaskByIdService } from '../services/update-task-by-id/update-task-by-id.service';

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
