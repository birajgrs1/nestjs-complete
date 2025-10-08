import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/users.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true, // Make the config module available throughout the entire application
      envFilePath: '.env',
    }),

    // Asynchronous configuration

    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'birajgrs@1',
        database: 'nestjs',
        autoLoadEntities: true,
        synchronize: true,
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
