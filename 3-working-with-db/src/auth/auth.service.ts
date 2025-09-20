import { Injectable } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // constructor(
  //   @Inject(forwardRef(() => UsersService))
  //   private usersService: UsersService,
  // ) {}
  // isAuthenticated: boolean = false;
  // login(email: string, password: string) {
  //   const user = this.usersService.users.find(
  //     (u) => u.email === email && u.password === password,
  //   );
  //   if (user) {
  //     Logger.log(`User ${email} logged in successfully.`);
  //     this.isAuthenticated = true;
  //     return {
  //       message: 'Sign in successful',
  //       token: 'my-token',
  //     };
  //   } else {
  //     Logger.warn(`Failed login attempt for email: ${email}`);
  //     return { message: 'Invalid credentials' };
  //   }
  // }
}
