import { Controller, Get } from '@nestjs/common';
import { RabbitmqProcessService } from './rabbitmq-process.service';

@Controller()
export class RabbitmqProcessController {
  constructor(private readonly rabbitmqProcessService: RabbitmqProcessService) {}

  @Get()
  getHello(): string {
    return this.rabbitmqProcessService.getHello();
  }
}
