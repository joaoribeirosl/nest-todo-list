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

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getAllTasksService: GetAllTasksService,
    private readonly getAllTasksByUserId: GetAllTasksByUserIdService,
    private readonly deleteTaskByIdService: DeleteTaskByIdService,
    private readonly updateTaskByIdService: UpdateTaskByIdService,
  ) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The task is successfully created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Title should not be empty',
  })
  async create(@Body() body: CreateTaskDto, @Query('token') token: string) {
    return this.createTaskService.execute(body, token);
  }

  @ApiOperation({ summary: 'Get all tasks from all users' })
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all tasks successfully',
  })
  async index() {
    return await this.getAllTasksService.execute();
  }

  @ApiOperation({ summary: 'Get all tasks from specific user' })
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all tasks from specific user successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async getAllById(@Param('id') param: string) {
    return await this.getAllTasksByUserId.execute(param);
  }

  @ApiOperation({ summary: 'Delete specific task' })
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Specific task was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  async delete(@Param('id') param: string) {
    return await this.deleteTaskByIdService.execute(param);
  }

  @ApiOperation({ summary: 'Update task title and/or description' })
  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Specific task was updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Title should not be empty',
  })
  async update(@Body() body: UpdateTaskDto) {
    return await this.updateTaskByIdService.execute(body);
  }
}
