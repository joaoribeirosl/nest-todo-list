import { Body, Controller, Post } from '@nestjs/common'
import { SigninService } from '../services/signin-service/signin.service'
import { SigninDto } from '../dto/signin.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly signinService: SigninService) {}

  @Post()
  async signin(@Body() body: SigninDto) {
    return await this.signinService.execute(body)
  }
}
