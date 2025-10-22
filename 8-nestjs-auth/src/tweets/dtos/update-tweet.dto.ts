import { PartialType } from '@nestjs/mapped-types';
import { createTweetDto } from './create-tweet.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class updateTweetDto extends PartialType(createTweetDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
