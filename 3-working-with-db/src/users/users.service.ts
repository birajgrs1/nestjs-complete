import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(userDto.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }
}
