import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards,
  Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "./auth-guard";
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
  ) {}


  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const {password, ...other} =
        await this.userService.findOne(req.user.sub);
    return other;
  }
}
