import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profiles/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
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
  // async createUser(userDto: CreateUserDto): Promise<User> {
  //   // Check if user already exists
  //   const existingUser = await this.findByEmail(userDto.email);
  //   if (existingUser) {
  //     throw new ConflictException('User already exists');
  //   }

  //   const newUser = this.userRepository.create(userDto as DeepPartial<User>);
  //   return await this.userRepository.save(newUser);
  // }

  public async createUser(userDto: CreateUserDto): Promise<User> {
    // Create a profile and save
    // let profile = this.profileRepository.create(
    //   userDto.profile as DeepPartial<Profile>,
    // );
    // profile = await this.profileRepository.save(profile);

    // Create a user object
    // const user = this.userRepository.create(userDto as DeepPartial<User>);

    // Set the profile
    // user.profile = profile;

    // Save the user object and return the full user with the profile populated
    // return await this.userRepository.save(user);

    // Using cascaded (no need manually)
    const user = this.userRepository.create(userDto as DeepPartial<User>);
    return await this.userRepository.save(user);
  }
}
