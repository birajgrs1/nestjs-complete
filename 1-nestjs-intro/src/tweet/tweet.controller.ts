import { Controller, Get, Post } from '@nestjs/common';

@Controller('tweet')
export class TweetController {
  @Post()
  createTweet() {
    return 'adds a new tweet';
  }

  @Get()
  getTweets() {
    return 'returns all tweets';
  }
}
