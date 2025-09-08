import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    profession: string;
    isMarried: boolean;
  }[] = [
    { id: 1, name: 'Ram', age: 30, profession: 'Developer', isMarried: true },
    {
      id: 2,
      name: 'Shyam',
      age: 25,
      profession: 'Business Analyst',
      isMarried: false,
    },
    { id: 3, name: 'Hari', age: 20, profession: 'Designer', isMarried: false },
    { id: 4, name: 'Sita', age: 22, profession: 'HR', isMarried: true },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createNewUser(user: {
    id: number;
    name: string;
    age: number;
    profession: string;
    isMarried: boolean;
  }) {
    this.users.push(user);
  }

  updateUser(user: {
    id: number;
    name: string;
    age: number;
    profession: string;
    isMarried: boolean;
  }) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
