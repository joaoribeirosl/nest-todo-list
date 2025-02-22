import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiUpdateUser() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Update user name and/or email' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Update user info successfully',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'All fiedls should not be empty',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    })(target, key, descriptor);
  };
}
