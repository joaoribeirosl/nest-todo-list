import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import { GetUserByIdService } from '../services/get-user-by-id/get-user-by-id.service';
import { GetAllUsersService } from '../services/get-all-users/get-all-users.service';
import { UpdateUserByIdService } from '../services/update-user/update-user-by-id.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly updateUserByIdService: UpdateUserByIdService,
  ) {}

  @ApiOperation({ summary: 'Create an user' })
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create user successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'All fiedls should not be empty',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'When another user already has this email',
  })
  async create(@Body() body: CreateUserDto) {
    return await this.createUserService.execute(body);
  }

  @ApiOperation({ summary: 'Get an user by its id' })
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get specific user',
  })
  async getOne(@Param('id') param: string) {
    return await this.getUserByIdService.execute(param);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users successfully',
  })
  async index() {
    return await this.getAllUsersService.execute();
  }

  @ApiOperation({ summary: 'Update user name and/or email' })
  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user info successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'All fiedls should not be empty',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async update(@Body() body: UpdateUserDto) {
    return await this.updateUserByIdService.execute(body);
  }
}
