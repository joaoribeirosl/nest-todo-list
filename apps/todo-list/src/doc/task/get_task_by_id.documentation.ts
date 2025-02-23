import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiGetTasksByUserId() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Get all tasks from specific user' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Get all tasks from specific user successfully',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    })(target, key, descriptor);
  };
}
