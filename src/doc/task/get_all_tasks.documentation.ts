import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiGetAllTasks() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Get all tasks from all users' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Get all tasks successfully',
    })(target, key, descriptor);
  };
}
