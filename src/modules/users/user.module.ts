/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './services/create-user/create-user.service';
import { GetAllUsersService } from './services/get-all-users/get-all-users.service';
import { GetUserByIdService } from './services/get-user-by-id/get-user-by-id.service';
import { JwtModule } from '@nestjs/jwt';
import { UpdateUserByIdService } from './services/update-user/update-user-by-id.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    GetAllUsersService,
    GetUserByIdService,
    UpdateUserByIdService,
  ],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class UserModule {}
