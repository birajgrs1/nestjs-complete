import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class createTweetDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
