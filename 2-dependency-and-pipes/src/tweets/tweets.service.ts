import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetsService {
  constructor(private readonly userService: UsersService) {}

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

  getTweets(userId?: number) {
    const users = this.userService.getAllUsers();

    if (!Array.isArray(users)) {
      return { message: 'User not authenticated' };
    }

    if (userId) {
      return this.tweets
        .filter((tweet) => tweet.userId === userId)
        .map((tweet) => ({
          ...tweet,
          user: users.find((u) => u.id === tweet.userId),
        }));
    }

    return this.tweets.map((tweet) => ({
      ...tweet,
      user: users.find((u) => u.id === tweet.userId),
    }));
  }
}
