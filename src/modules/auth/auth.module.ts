import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { SigninService } from './services/signin-service/signin.service';
import { JwtModule } from '@nestjs/jwt';
import { DecodeTokenService } from './services/decode-token-service/decode-token.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [SigninService, DecodeTokenService],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
