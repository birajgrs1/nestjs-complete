import { Injectable, Inject, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import type { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  isAuthenticated = false;

  login(email: string, password: string) {
    this.logger.log(
      `AuthService: login() called with email: ${email} and password: ${password}`,
    );
    this.logger.log(
      `AuthService: Shared secret is: ${this.authConfiguration.sharedSecret}`,
    );
    return 'Not implemented yet';
  }

  async signup(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
