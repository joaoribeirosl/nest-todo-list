import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiGetUserById() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Get an user by its id' })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Get specific user',
    })(target, key, descriptor);
  };
}
