import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

export function ApiCreateTask() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    MessagePattern('create_task');
    ApiOperation({ summary: 'Create a new task' })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The task is successfully created',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid token',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Title should not be empty',
    })(target, key, descriptor);
  };
}
