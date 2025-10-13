import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  public async createNewHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtagDto(createHashtagDto);
  }

  // @Delete(':id')
  // public deleteHashtag(@Param('id', ParseIntPipe) id: number) {
  //   return this.hashtagService.deleteHashtag(id);
  // }

  // soft delete
  @Delete(':id')
  public deleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.deleteHashtag(id);
  }
}
