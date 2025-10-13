import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Logger } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly logger: Logger,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  isAuthenticated: boolean = false;

  login(email: string, password: string) {
    this.logger.log(
      `AuthService: login() called with email: ${email} and password: ${password}`,
    );
    this.logger.log(
      `AuthService: Shared secret is: ${this.authConfiguration.sharedSecret}`,
    );
    return 'Not implemented yet';
  }
}
