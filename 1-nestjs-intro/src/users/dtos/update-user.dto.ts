import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @Min(1)
  @Max(10000)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNumber()
  @Min(17)
  @Max(100)
  age: number;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  profession: string;

  @IsBoolean()
  isMarried: boolean;
}
