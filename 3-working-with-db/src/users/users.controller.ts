import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
/*
What is Eager Loading?
Eager loading in TypeOrm means that when you fetch an entity from the database, its 
related entities (defined in relationships such as @OneToMany, @ManyToMany, etc.) are automatically 
loaded alongside it - without you having to explicitly specify it in your query.
*/
