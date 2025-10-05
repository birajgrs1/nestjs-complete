import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { createTweetDto } from './dtos/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class TweetsService {
  private readonly logger = new Logger(TweetsService.name);

  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly hashtagService: HashtagService,
  ) {}

  // Get all tweets for a specific user
  public async getTweets(userId: number) {
    const tweets = await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: { user: true, hashtags: true }, // Eager loading of user and hashtags
    });
    return tweets;
  }

  // Create a new tweet
  public async CreateTweet(createTweetDto: createTweetDto) {
    const user = await this.userService.findUserById(createTweetDto.userId);
    if (!user) {
      this.logger.error(`User with ID ${createTweetDto.userId} not found.`);
      throw new NotFoundException('User not found');
    }

    const hashtags = await this.hashtagService.findHashtags(
      createTweetDto.hashtags || [],
    );
    if (!Array.isArray(hashtags) || hashtags.length === 0) {
      this.logger.error(
        `Hashtags with IDs ${createTweetDto.hashtags?.join(', ') ?? 'none'} not found.`,
      );
      throw new NotFoundException('Hashtags not found');
    }

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user,
      hashtags: hashtags,
    });

    this.logger.log(`Creating tweet for user ${createTweetDto.userId}`);
    return await this.tweetRepository.save(tweet);
  }
}
