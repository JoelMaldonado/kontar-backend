import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/config/guards/auth.guard';
import e, { Request } from 'express';
import { constants } from 'src/config/constants';
import { RefreshTokenGuard } from 'src/config/guards/refresh-token.guard';
import { responseHelper } from 'src/config/response-helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      const result = await this.authService.login(username, password);
      return responseHelper.success(result);
    } catch (error) {
      return responseHelper.error(error);
    }
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Req() request: Request) {
    try {
      const user = request[constants.user];
      const result = await this.authService.refreshToken(user.sub);
      return responseHelper.success(result);
    } catch (error) {
      return responseHelper.error(error);
    }
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      const result = await this.authService.register(username, password);
      return {
        statusCode: 200,
        message: 'Registration successful',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Registration failed',
        error: error.message,
      };
    }
  }
}
