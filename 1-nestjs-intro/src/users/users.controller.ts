import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get All Users
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Get User By Id
  @Get(':id')
  getUserById(id: number) {
    return this.usersService.getUserById(id);
  }

  // Create New User
  @Get('create')
  createNewUser(user: {
    id: number;
    name: string;
    age: number;
    profession: string;
    isMarried: boolean;
  }) {
    return this.usersService.createNewUser(user);
  }

  // Update User
  @Get('update')
  updateUser(user: {
    id: number;
    name: string;
    age: number;
    profession: string;
    isMarried: boolean;
  }) {
    return this.usersService.updateUser(user);
  }

  // Delete User
  @Get('delete')
  deleteUser(id: number) {
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
