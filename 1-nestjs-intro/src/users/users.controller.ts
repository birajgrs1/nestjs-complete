import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
  @Get('query')
  getAllUsersWithQuery(@Query() query: any) {
    console.log(query);
    return this.usersService.getAllUsers();
  }

  // Get User By Id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
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
  @Post('create')
  createNewUser(
    @Body()
    user: {
      id: number;
      name: string;
      age: number;
      profession: string;
      isMarried: boolean;
    },
  ) {
    return this.usersService.createNewUser(user);
  }

  // Update User
  @Put('update')
  updateUser(
    @Body()
    user: {
      id: number;
      name: string;
      age: number;
      profession: string;
      isMarried: boolean;
    },
  ) {
    return this.usersService.updateUser(user);
  }

  // Delete User
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}

/*
@Request(), @Req()	req
@Response(), @Res()*	res
@Next()	next
@Session()	req.session
@Param(key?: string)	req.params / req.params[key]
@Body(key?: string)	req.body / req.body[key]
@Query(key?: string)	req.query / req.query[key]
@Headers(name?: string)	req.headers / req.headers[name]
@Ip()	req.ip
@HostParam()	req.hosts
*/
