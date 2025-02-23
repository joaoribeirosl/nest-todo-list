import { Module } from '@nestjs/common';
import { RabbitmqProcessController } from './rabbitmq-process.controller';
import { RabbitmqProcessService } from './rabbitmq-process.service';

@Module({
  imports: [],
  controllers: [RabbitmqProcessController],
  providers: [RabbitmqProcessService],
})
export class RabbitmqProcessModule {}
