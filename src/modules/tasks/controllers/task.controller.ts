import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateTaskService } from '../services/create-task-service/create-task.service';
import { GetAllTasksService } from '../services/get-all-tasks-service/get-all-tasks.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getAllTasksService: GetAllTasksService,
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
}
