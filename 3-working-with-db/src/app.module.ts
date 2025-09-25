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

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    // Sychronous configuration
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'birajgrs@1',
    //   database: 'nestjs',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   entities: [],
    // }),

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
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
