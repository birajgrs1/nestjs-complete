import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { createTweetDto } from './dtos/create-tweet.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class TweetsService {
  private readonly logger = new Logger(TweetsService.name);

  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  private readonly tweets = [
    { id: 1, text: 'Hello World', date: new Date(), userId: 1 },
    { id: 2, text: 'My second tweet', date: new Date(), userId: 2 },
    { id: 3, text: 'NestJS is awesome', date: new Date(), userId: 3 },
    {
      id: 4,
      text: 'Dependency Injection is powerful',
      date: new Date(),
      userId: 4,
    },
    { id: 5, text: 'I love programming', date: new Date(), userId: 5 },
    { id: 6, text: 'TypeScript is great', date: new Date(), userId: 6 },
  ];

  async getTweets(userId?: number) {
    const users: User[] = await this.userService.getAllUsers();

    if (!Array.isArray(users)) {
      return { message: 'User not authenticated' };
    }

    if (userId) {
      return this.tweets
        .filter((tweet) => tweet.userId === userId)
        .map((tweet) => {
          const user = users.find((u) => u.id === tweet.userId);
          if (!user) {
            this.logger.warn(
              `User with ID ${tweet.userId} not found for tweet ${tweet.id}`,
            );
            return { ...tweet, user: null };
          }
          this.logger.log(`Tweet ${tweet.id} found for user ${user.id}`);
          return { ...tweet, user };
        });
    }

    return this.tweets.map((tweet) => {
      const user = users.find((u) => u.id === tweet.userId);
      if (!user) {
        this.logger.warn(
          `User with ID ${tweet.userId} not found for tweet ${tweet.id}`,
        );
        return { ...tweet, user: null };
      }
      this.logger.log(`Tweet ${tweet.id} found for user ${user.id}`);
      return { ...tweet, user };
    });
  }

  public async CreateTweet(createTweetDto: createTweetDto) {
    // Find user with given userId from user table
    const user = await this.userService.findUserById(createTweetDto.userId);
    if (!user) {
      this.logger.error(`User with ID ${createTweetDto.userId} not found.`);
      throw new Error('User not found');
    }

    // create a tweet
    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user,
    });

    // save the tweet
    this.logger.log(`Creating tweet for user ${createTweetDto.userId}`);
    return await this.tweetRepository.save(tweet);
  }
}
