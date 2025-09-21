import {
  // IsBoolean,
  IsNumber,
  // IsOptional,
  IsString,
  IsNotEmpty,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(10000)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  username: string;

  // @Type(() => Number)
  // @IsNumber()
  // @Min(17)
  // @Max(100)
  // age: number;

  // @IsString()
  // @IsOptional()
  // gender: string;

  // @IsString()
  // @IsOptional()
  // profession: string;

  // @Type(() => Boolean)
  // @IsBoolean()
  // isMarried: boolean;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
