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
// import { GetUsersByStatusDto } from './dtos/get-users-by-status.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get All Users
  @Get()
  getAllUsers(@Query() query: any) {
    console.log(query);
    return this.usersService.getAllUsers(query);
  }

  //Get Users by querystring
  // @Get('query')
  // getAllUsersWithQuery(@Query() query: any) {
  //   console.log(query);
  //   return this.usersService.getAllUsers();
  // }

  @Get('limit')
  getAllUsersWithLimit(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit);
    console.log(page);
    return this.usersService.getAllUsers(); // this still returns all users; pagination logic can be added in service
  }

  // Using DTO with Route Parameter
  //   @Get('status/:isMarried')
  //   getUsersByMarriedStatus(
  //     @Param(new ValidationPipe({ transform: true }))
  //     params: GetUsersByStatusDto,
  //   ) {
  //     return this.usersService.getUsersByMarriedStatus(params.isMarried);
  //   }

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

  // Create New User
  // @Post('create')
  // createNewUser(
  //   @Body()
  //   user: {
  //     id: number;
  //     name: string;
  //     age: number;
  //     gender: string;
  //     profession: string;
  //     isMarried: boolean;
  //   },
  // ) {
  //   return this.usersService.createNewUser(user);
  // }

  @Post()
  createNewUser(
    @Body(new ValidationPipe({ transform: true })) user: CreateUserDto,
  ) {
    return this.usersService.createNewUser(user);
  }

  // Update User
  // @Put('update')
  // updateUser(
  //   @Body()
  //   user: {
  //     id: number;
  //     name: string;
  //     age: number;
  //     gender: string;
  //     profession: string;
  //     isMarried: boolean;
  //   },
  // ) {
  //   return this.usersService.updateUser(user);
  // }

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
