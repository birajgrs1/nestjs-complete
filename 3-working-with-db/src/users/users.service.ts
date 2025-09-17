import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    profession: string;
    isMarried: boolean;
    email?: string;
    password?: string;
  }[] = [
    {
      id: 1,
      name: 'Ram',
      age: 30,
      gender: 'male',
      profession: 'Developer',
      email: 'ram@gmail.com',
      password: 'password123',
      isMarried: true,
    },
    {
      id: 2,
      name: 'Shyam',
      age: 25,
      gender: 'male',
      profession: 'Business Analyst',
      email: 'shyam@gmail.com',
      password: 'password123',
      isMarried: false,
    },
    {
      id: 3,
      name: 'Hari',
      age: 20,
      gender: 'male',
      profession: 'Designer',
      email: 'hari@gmail.com',
      password: 'password123',
      isMarried: false,
    },
    {
      id: 4,
      name: 'Sita',
      age: 22,
      gender: 'female',
      profession: 'HR',
      email: 'sita@gmail.com',
      password: 'password123',
      isMarried: true,
    },
    {
      id: 5,
      name: 'Gita',
      age: 27,
      gender: 'female',
      profession: 'Accountant',
      email: 'gita@gmail.com',
      password: 'password123',
      isMarried: true,
    },
    {
      id: 6,
      name: 'Laxman',
      age: 32,
      gender: 'male',
      profession: 'Developer',
      email: 'laxman@gmail.com',
      password: 'password123',
      isMarried: true,
    },
  ];

  // getAllUsers() {
  //   if (this.authService.isAuthenticated) {
  //     return this.users;
  //   } else {
  //     return { message: 'User not authenticated' };
  //   }
  // }

  getAllUsers(query?: { age?: string; isMarried?: string }) {
    if (!this.authService.isAuthenticated) {
      return { message: 'User not authenticated' };
    }

    if (!query || Object.keys(query).length === 0) {
      return this.users;
    }

    const { age, isMarried } = query;

    return this.users.filter((user) => {
      let match = true;

      if (age !== undefined) {
        match = match && user.age === Number(age);
      }

      if (isMarried !== undefined) {
        match = match && user.isMarried === (isMarried === 'true');
      }

      return match;
    });
  }

  getUsersByMarriedStatus(isMarried: boolean) {
    return this.users.filter((user) => user.isMarried === isMarried);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  getUserByAgeAndMarriedStatus(age: number, isMarried: boolean) {
    return this.users.filter(
      (user) => user.age === age && user.isMarried === isMarried,
    );
  }

  createNewUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    profession: string;
    isMarried: boolean;
    email: string;
    password: string;
  }) {
    this.users.push(user);
  }

  updateUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    profession: string;
    isMarried: boolean;
    email: string;
    password: string;
  }) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
