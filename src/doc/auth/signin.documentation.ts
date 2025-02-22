import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiSignIn() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Generate user token from signin' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The signin was successful',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Incorrect password',
    })(target, key, descriptor);
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Email not found',
    })(target, key, descriptor);
  };
}
