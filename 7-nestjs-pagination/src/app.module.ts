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
What is Pagination?

The pagination is a technique used to divide  large sets of data into smaller, more manageable chunks or "pages". 
Instead of loading and displaying all the data at once, which can lead to performance issues and a poor user 
experience, pagination displays a subset of the data that allows users to navigate through the remaining data using 
page controls. 
E.g: "Next", "Previous", or specific page numbers.

Why use Pagination?

1. Improved Performance: Loading and rendering a large dataset can be resource-intensive and slow down the application. 
By fetching and displaying only a portion of the data at a time, pagination helps reduce the load on the server and 
improves response times.

2. Enhanced User Experience: Presenting users with a massive amount of data all at once can be overwhelming and 
difficult to navigate. Pagination allows users to focus on smaller, more relevant subsets of data, making it easier 
to find what they are looking for.

3. Reduced Bandwidth Usage: Pagination helps minimize the amount of data transferred between the server and client, 
which is especially important for users with limited bandwidth or slower internet connections.

4. Scalability: As applications grow and datasets become larger, pagination provides a scalable solution for managing 
and displaying data efficiently without compromising performance or user experience.

Types of Pagination:

1. Offset-based Pagination: This method uses an offset value to determine where to start fetching data from. 
For example, if you want to fetch 10 items per page, the first page would have an offset of 0, the second page 
would have an offset of 10, and so on. This approach is simple to implement but can lead to performance issues 
with large datasets.

2. Cursor-based Pagination: Instead of using an offset, cursor-based pagination relies on a unique identifier 
(such as a timestamp or ID) to mark the last item retrieved in the previous page. The next page fetches items 
that come after this identifier. This method is more efficient for large datasets and provides better consistency 
when data is frequently updated.

3. Keyset Pagination: Similar to cursor-based pagination, keyset pagination uses a set of keys (e.g., primary keys) 
to determine the starting point for the next page. It is particularly useful for ordered datasets and can
  provide better performance than offset-based pagination.

4. Infinite Scrolling: Instead of traditional pagination with page numbers, infinite scrolling loads more data
as the user scrolls down the page. This approach provides a seamless user experience but can be challenging 
to implement and may lead to performance issues if not managed properly.

*/
