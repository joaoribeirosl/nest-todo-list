import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiGetAllUsers() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Get all users' })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Get all users successfully',
    })(target, key, descriptor);
  };
}
