import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TasksModule, UserModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
