import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqProcessService {
  getHello(): string {
    return 'Hello World!';
  }
}
