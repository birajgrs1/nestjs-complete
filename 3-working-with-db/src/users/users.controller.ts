import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get All Users
  @Get()
  getAllUsers(@Query() query: any) {
    console.log(query);
    return this.usersService.getAllUsers(query);
  }

  @Get('limit')
  getAllUsersWithLimit(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit);
    console.log(page);
    return this.usersService.getAllUsers(); 
  }


  // Get User By Id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.usersService.getUserById(id);
  }

  // Get user based on age and married status
  @Get('age/:age/married/:isMarried')
  getUserByAgeAndMarriedStatus(
    @Param('age') age: string,
    @Param('isMarried') isMarried: string,
  ) {
    return this.usersService.getUserByAgeAndMarriedStatus(
      Number(age),
      isMarried === 'true',
    );
  }

  @Post()
  createNewUser(
    @Body(new ValidationPipe({ transform: true })) user: CreateUserDto,
  ) {
    return this.usersService.createNewUser(user);
  }

  @Put('update')
  updateUser(
    @Body(new ValidationPipe({ transform: true })) user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user);
  }

  // Delete User
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
