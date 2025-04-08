import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.login(username, password);
    return {
      statusCode: 200,
      message: 'Login successful',
      data: result,
    };
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
