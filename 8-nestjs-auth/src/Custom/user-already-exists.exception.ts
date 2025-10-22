import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string, description?: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        error: 'UserAlreadyExistsException',
        message: `A user with the email '${email}' already exists.`,
        description:
          description ??
          `The system encountered a unique constraint violation while trying to create a user with email '${email}'.`,
        errorCode: 'USER_ALREADY_EXISTS',
        timestamp: new Date().toISOString(),
      },
      HttpStatus.CONFLICT,
    );
  }
}
