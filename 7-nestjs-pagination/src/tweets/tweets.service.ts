import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { createTweetDto } from './dtos/create-tweet.dto';
import { updateTweetDto } from './dtos/update-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';

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
  public async getTweets(userId?: number, paginationDto?: PaginationDto) {
    const queryBuilder = this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.user', 'user')
      .leftJoinAndSelect('tweet.hashtags', 'hashtags');

    if (userId !== undefined) {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        this.logger.error(`User with ID ${userId} not found.`);
        throw new NotFoundException('User not found');
      }
      queryBuilder.where('user.id = :userId', { userId });
    }

    if (paginationDto) {
      const { limit = 10, page = 1 } = paginationDto;
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);
    }

    const tweets = await queryBuilder.getMany();
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

  // Update an existing tweets
  public async updateTweet(updateTweetDto: updateTweetDto) {
    //Find the tweet
    const tweet = await this.tweetRepository.findOne({
      where: { id: updateTweetDto.id },
      relations: { user: true, hashtags: true }, // Eager loading of user and hashtags
    });
    if (!tweet) {
      this.logger.error(`Tweet with ID ${updateTweetDto.id} not found.`);
      throw new NotFoundException('Tweet not found');
    }

    // Find and update hashtags only if provided
    const incomingHashtags = updateTweetDto.hashtags;
    if (Array.isArray(incomingHashtags) && incomingHashtags.length > 0) {
      const hashtags = await this.hashtagService.findHashtags(incomingHashtags);
      tweet.hashtags = hashtags;
    }

    //Update the tweet
    const text = updateTweetDto.text;
    if (typeof text === 'string' && text.trim() !== '') {
      tweet.text = text;
    }
    const image = updateTweetDto.image;
    if (typeof image === 'string' && image.trim() !== '') {
      tweet.image = image;
    }

    this.logger.log(`Updating tweet with ID ${updateTweetDto.id}`);
    return await this.tweetRepository.save(tweet);
  }

  // Delete a tweet
  public async deleteTweet(id: number) {
    this.logger.log(`Deleting tweet with ID ${id}`);
    return await this.tweetRepository.delete(id);
  }
}
