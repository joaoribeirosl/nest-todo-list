import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiCreateUser() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Create a new user' })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Create user successfully',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'All fiedls should not be empty',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'When another user already has this email',
    })(target, key, descriptor);
  };
}
