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
import { PaginationModule } from './common/pagination/pagination.module';

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // entities: [User],
      }),
    }),

    ProfilesModule,
    HashtagModule,
    PaginationModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}

/*
What is Authentication ?

Authentication is the process of verifying the identity of a user or system.
It answers the question, "Who are you?"
It ensures that the entity requesting access is who they claim to be, typically through credentials like usernames and passwords,
 biometric data, or tokens. Authentication is a crucial step in securing applications and systems, 
 as it helps prevent unauthorized access and protects sensitive information.

Why is Authentication important ?

Authentication is important for several reasons:

1. Security: It helps protect sensitive data and resources from unauthorized access, reducing the risk of data breaches and cyberattacks.

2. User Accountability: By verifying user identities, authentication ensures that actions taken within a system can be traced back to specific users, promoting accountability.

3. Access Control: It enables systems to enforce access policies, ensuring that only authorized users can access certain features or data.

4. Trust: Authentication builds trust between users and systems, as users feel more secure knowing that their information is protected.

5. Compliance: Many industries have regulatory requirements that mandate strong authentication measures to protect user data and privacy.

Overall, authentication is a fundamental component of modern security practices, essential for safeguarding digital environments.

Ways of Authentication:

1. Password-Based Authentication: The most common method, where users provide a username and password to verify their identity.

2. Multi-Factor Authentication (MFA): Combines two or more authentication methods, such as something you know (password), something you have (a mobile device), and something you are (biometric data).

3. Biometric Authentication: Uses unique biological traits like fingerprints, facial recognition, or iris scans to verify identity.

4. Token-Based Authentication: Involves the use of tokens (e.g., JWT, OAuth tokens) that are issued after initial authentication and used for subsequent requests.

5. Social Login: Allows users to authenticate using their existing accounts from social media platforms like Google, Facebook, or Twitter.

6. Certificate-Based Authentication: Utilizes digital certificates to establish identity, commonly used in secure communications.

7. Single Sign-On (SSO): Enables users to authenticate once and gain access to multiple related systems without needing to log in again for each one.

 
*/
