import { Injectable, ConflictException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // Create a new user
  async createUser(userDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = this.userRepository.create(userDto as DeepPartial<User>);
    return await this.userRepository.save(newUser);
  }
}
