import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiDeleteTaskById() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Delete specific task' })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Specific task was deleted successfully',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Task not found',
    })(target, key, descriptor);
  };
}
