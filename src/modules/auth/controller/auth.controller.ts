import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SigninService } from '../services/signin-service/signin.service';
import { SigninDto } from '../dto/signin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly signinService: SigninService) {}

  @ApiOperation({ summary: 'Generate user token from signin' })
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The signin was successful',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Incorrect password',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Email not found',
  })
  async signin(@Body() body: SigninDto) {
    return await this.signinService.execute(body);
  }
}
