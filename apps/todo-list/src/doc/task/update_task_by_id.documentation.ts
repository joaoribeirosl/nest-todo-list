import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiUpdateTaskById() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Update task title and/or description' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Specific task was updated successfully',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Title should not be empty',
    })(target, key, descriptor);
  };
}
