import { IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsersByStatusDto {
  @Type(() => Boolean)
  @IsBoolean()
  isMarried: boolean;
}
