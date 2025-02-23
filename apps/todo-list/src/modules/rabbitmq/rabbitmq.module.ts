import { Module } from '@nestjs/common';
import { RabbitmqService } from './services/rabbitmq.service';

@Module({
  providers: [RabbitmqService],
})
export class RabbitmqModule {}
