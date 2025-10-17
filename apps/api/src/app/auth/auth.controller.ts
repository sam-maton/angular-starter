import { Controller, Get, Post } from '@nestjs/common';
import { auth } from '../../lib/auth';
import { toNodeHandler } from 'better-auth/node';

@Controller('auth')
export class AuthController {
  @Get('/*')
  @Post('/*')
  auth() {
    return toNodeHandler(auth);
  }
}
