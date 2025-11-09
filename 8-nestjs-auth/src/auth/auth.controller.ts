import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //login
  @Post()
  login(@Body() user: { email: string; password: string }) {
    return this.authService.login(user.email, user.password);
  }

  //signup
  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.signup(CreateUserDto);
  }
}
