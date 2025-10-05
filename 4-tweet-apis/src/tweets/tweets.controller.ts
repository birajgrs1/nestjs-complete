import {
  Controller,
  Get,
  Param,
  Logger,
  ParseIntPipe,
  Body,
  Post,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { createTweetDto } from './dtos/create-tweet.dto';

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

  @Get(':userId')
  public getTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetsService.getTweets(userId);
  }

  @Post()
  public createTweet(@Body() tweet: createTweetDto) {
    return this.tweetsService.CreateTweet(tweet);
  }
}
