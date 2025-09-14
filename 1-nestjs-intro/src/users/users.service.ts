import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    profession: string;
    isMarried: boolean;
  }[] = [
    {
      id: 1,
      name: 'Ram',
      age: 30,
      gender: 'male',
      profession: 'Developer',
      isMarried: true,
    },
    {
      id: 2,
      name: 'Shyam',
      age: 25,
      gender: 'male',
      profession: 'Business Analyst',
      isMarried: false,
    },
    {
      id: 3,
      name: 'Hari',
      age: 20,
      gender: 'male',
      profession: 'Designer',
      isMarried: false,
    },
    {
      id: 4,
      name: 'Sita',
      age: 22,
      gender: 'female',
      profession: 'HR',
      isMarried: true,
    },
    {
      id: 5,
      name: 'Gita',
      age: 27,
      gender: 'female',
      profession: 'Accountant',
      isMarried: true,
    },
    {
      id: 6,
      name: 'Laxman',
      age: 32,
      gender: 'male',
      profession: 'Developer',
      isMarried: true,
    },
  ];

  getAllUsers(query?: { age?: string; isMarried?: string }) {
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

  // Add this missing method
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

/*
Providers:
Providers are a core concept in Nest. Many of the basic Nest classes, such as services,
repositories, factories, and helpers, can be treated as providers. 
The key idea behind a provider is that it can be injected as a dependency, allowing objects to
form various relationships with each other. 
The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.

nest g service <service-name>
- service is used to handle business logic, and it is a core concept in Nest.
*/
