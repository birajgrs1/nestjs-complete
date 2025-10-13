import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './auth/config/auth.config';
import { envValidationSchema } from './config/env.validation';

const ENV = process.env.ENV_MODE;

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig, authConfig],
      validationSchema: envValidationSchema,
    }),

    // Asynchronous configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        // Reading With ConfigService
        host: configService.get<string>('database.host') || 'localhost',
        port: configService.get<number>('database.port') || 5432,
        username: configService.get<string>('database.username') || 'postgres',
        password: String(configService.get<string>('database.password') || ''),
        database: configService.get<string>('database.database') || 'nestjs',

        autoLoadEntities:
          configService.get<boolean>('database.autoLoadEntities') ?? true,
        synchronize: configService.get<boolean>('database.synchronize') ?? true,
        // entities: [User],
      }),
    }),

    ProfilesModule,
    HashtagModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}

/*
What is Exception Handling ? 
- In Nestjs, as in other programming environments, an "exception" represents an error condition 
that disrupts the normal flow of execution in an application. Exception handling is the process of
responding to these exceptions in a controlled manner, allowing the application to recover or 
fail gracefully.

- In NestJS, exception handling is typically done using built-in mechanisms that allow developers 
to catch and respond to errors that occur during the execution of their code. This is crucial for 
building robust applications that can handle unexpected situations without crashing.

- NestJS provides several ways to handle exceptions, including:

1. Built-in Exception Filters: NestJS comes with a set of built-in exception filters that can be 
used to catch and handle common types of exceptions, such as HTTP exceptions. For example, the 
`HttpException` class can be used to throw HTTP-specific errors.

2. Custom Exception Filters: Developers can create their own custom exception filters by implementing 
the `ExceptionFilter` interface. This allows for more granular control over how specific exceptions 
are handled.

3. Global Exception Filters: Exception filters can be applied globally to catch all unhandled exceptions 
in the application. This
  is useful for logging errors or returning a standard error response format.
4. Try-Catch Blocks: In addition to using exception filters, developers can also use traditional
  try-catch blocks within their service methods or controllers to handle exceptions at a more
  localized level.

5. Middleware: Exception handling can also be implemented in middleware to catch errors that occur 
before reaching the route handlers.
*/
