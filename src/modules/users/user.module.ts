/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { GetAllUsersService } from './services/get-all-users.service';
import { GetUserByIdService } from './services/get-user-by-id.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserService } from './services/create-user.service';
import { UpdateUserByIdService } from './services/update-user-by-id.service';

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
