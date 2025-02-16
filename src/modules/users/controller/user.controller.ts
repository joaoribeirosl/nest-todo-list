import { ApiCreateUser } from '@document/user/create_user.documentation';
import { ApiGetAllUsers } from '@document/user/get_all_users.documentation';
import { ApiGetUserById } from '@document/user/get_user_by_id.documentation';
import { ApiUpdateUser } from '@document/user/update_user_by_id.documentation';
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import { GetAllUsersService } from '../services/get-all-users/get-all-users.service';
import { GetUserByIdService } from '../services/get-user-by-id/get-user-by-id.service';
import { UpdateUserByIdService } from '../services/update-user/update-user-by-id.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly updateUserByIdService: UpdateUserByIdService,
  ) {}

  @ApiCreateUser()
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUserService.execute(body);
  }

  @ApiGetUserById()
  @Get(':id')
  async getOne(@Param('id') param: string) {
    return await this.getUserByIdService.execute(param);
  }

  @ApiGetAllUsers()
  @Get()
  async index() {
    return await this.getAllUsersService.execute();
  }

  @ApiUpdateUser()
  @Put()
  async update(@Body() body: UpdateUserDto) {
    return await this.updateUserByIdService.execute(body);
  }
}
