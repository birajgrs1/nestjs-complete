import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

const ENV = process.env.ENV_MODE;

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true, // Make the config module available throughout the entire application
      // envFilePath: '.env',
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
    }),

    // Asynchronous configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        // Reading With process.env
        // host: process.env.DB_HOST,
        // port: parseInt(process.env.DB_PORT ?? '5432', 10),
        // username: process.env.DB_USERNAME,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_NAME,

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
CONFIG MODULE:

The ConfigModule of @nestjs/config package is a Nestjs official pacakge that provides a robust way to load and access configuraton settings
throughout yout application. 
It simplifies the process of handling environment variables, custom configuration files, and other configuration sources.
*/
