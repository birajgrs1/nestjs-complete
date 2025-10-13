import {
  Injectable,
  Logger,
  NotFoundException,
  RequestTimeoutException,
  // , NotFoundException
} from '@nestjs/common';
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
    // return this.userRepository.find({
    //   relations: {
    //     //apply eager loading
    //     profile: true,
    //   },
    // });
    try {
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      Logger.error('Error fetching users', error);
      throw new NotFoundException({
        description: 'Error fetching users',
        'An error occurred while fetching users. Please try again later.': true,
      });
    }
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  // Create a new user
  public async createUser(userDto: CreateUserDto): Promise<User> {
    // Using cascaded (no need manually)
    try {
      userDto.profile = userDto.profile ?? {};
      const user = this.userRepository.create(userDto as DeepPartial<User>);
      return await this.userRepository.save(user);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: unknown }).code === 'ER_DUP_ENTRY'
      ) {
        throw new NotFoundException(
          `User with email ${userDto.email} already exists`,
        );
      }
      Logger.error('Error creating user', error);
      throw new RequestTimeoutException({
        description: 'Error creating user',
        'An error occurred while creating the user. Please try again later.': true,
      });
    }
  }

  // delete a user
  public async deleteUser(id: number): Promise<{ deleted: boolean }> {
    //delete the user
    await this.userRepository.delete(id);

    //send a response
    return { deleted: true };
    // return { message: `User with id ${id} and their profile were deleted.` };
  }

  // Get user by id
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
      // relations: {
      //   //apply eager loading
      //   profile: true,
      // },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
