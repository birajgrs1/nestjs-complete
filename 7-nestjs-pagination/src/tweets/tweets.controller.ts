import {
  Controller,
  Get,
  Param,
  Logger,
  ParseIntPipe,
  Body,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { createTweetDto } from './dtos/create-tweet.dto';
import { updateTweetDto } from './dtos/update-tweet.dto';
import { GetTweetQueryDto } from './dtos/get-tweet-query.dto';

@Controller('tweets')
export class TweetsController {
  private readonly logger = new Logger(TweetsController.name);

  constructor(private readonly tweetsService: TweetsService) {}

  // @Get()
  // getAllTweets() {
  //   this.logger.log('Fetching tweets for all users');
  //   return this.tweetsService.getTweets();
  // }

  // @Get(':userId')
  // getTweetsByUser(@Param('userId', ParseIntPipe) userId: number) {
  //   this.logger.log(`Fetching tweets for user ID: ${userId}`);
  //   return this.tweetsService.getTweets(userId);
  // }

  // http://localhost:3000/tweets?limit=10&page=2&startDate=2025-01-01&endDate=2025-10-01
  @Get()
  public getTweets(@Query() query?: GetTweetQueryDto) {
    this.logger.log(`Fetching tweets for all users`);
    return this.tweetsService.getTweets(undefined, query);
  }

  // http://localhost:3000/tweets/1?limit=10&page=2&startDate=2025-01-01&endDate=2025-10-01
  @Get(':userId')
  public getTweetsByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query?: GetTweetQueryDto,
  ) {
    this.logger.log(`Fetching tweets for user ID: ${userId}`);
    return this.tweetsService.getTweets(userId, query);
  }

  @Post()
  public createTweet(@Body() tweet: createTweetDto) {
    return this.tweetsService.CreateTweet(tweet);
  }

  @Patch()
  public updateTweet(@Body() tweet: updateTweetDto) {
    return this.tweetsService.updateTweet(tweet);
  }

  @Delete(':id')
  public deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetsService.deleteTweet(id);
  }
}
