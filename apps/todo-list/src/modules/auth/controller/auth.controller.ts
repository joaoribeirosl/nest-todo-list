import { ApiSignIn } from '@document/auth/signin.documentation';
import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from '../dto/signin.dto';
import { SigninService } from '../services/signin.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly signinService: SigninService) {}

  @ApiSignIn()
  @Post()
  async signin(@Body() body: SigninDto) {
    return await this.signinService.execute(body);
  }
}
