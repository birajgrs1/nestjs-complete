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
import { GetUsersByStatusDto } from './dtos/get-users-by-status.dto';

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
    return this.usersService.getAllUsers();
  }

  // Using DTO with Route Parameter
  @Get('status/:isMarried')
  getUsersByMarriedStatus(
    @Param(new ValidationPipe({ transform: true }))
    params: GetUsersByStatusDto,
  ) {
    return this.usersService.getUsersByMarriedStatus(params.isMarried);
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

/*
Pipes: 
A pipe is a class annotated with the @Injectable() decorator, which implements the 
PipeTransform interface.

Pipes have two typical use cases:

transformation: transform input data to the desired form (e.g., from string to integer)
validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, 
throw an exception

In both cases, pipes operate on the arguments being processed by a controller route handler. 
Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments 
destined for the method and operates on them. Any transformation or validation operation takes 
place at that time, after which the route handler is invoked with any (potentially) 
transformed arguments.


@PipeTransform()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    return parseInt(value);
  }
}

Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is 
handled by the exceptions layer 
(global exceptions filter and any exceptions filters that are applied to the current context).


Built-in pipes#
Nest comes with several pipes available out-of-the-box:

ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
ParseFilePipe
ParseDatePipe

They're exported from the @nestjs/common package.
*/
