import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  lastName?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
