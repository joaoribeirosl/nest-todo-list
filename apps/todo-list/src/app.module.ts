import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RabbitmqModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [TasksModule, UserModule, AuthModule, PrismaModule, RabbitmqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
