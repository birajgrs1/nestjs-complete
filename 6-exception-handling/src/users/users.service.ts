import {
  Injectable,
  Logger,
  NotFoundException,
  // RequestTimeoutException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profiles/profile.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Get all users
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      this.logger.error('Error fetching users', error);
      throw new NotFoundException({
        description: 'Error fetching users',
        message:
          'An error occurred while fetching users. Please try again later.',
      });
    }
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // Create a new user with constraint handling
  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      userDto.profile = userDto.profile ?? {};

      const user = this.userRepository.create(userDto as DeepPartial<User>);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user', error);

      // MySQL
      const mysqlError = error as {
        code?: string;
        errno?: number;
        message?: string;
      };

      if (mysqlError.code === 'ER_DUP_ENTRY' && mysqlError.errno === 1062) {
        throw new ConflictException(
          `User with email ${userDto.email} already exists.`,
        );
      }

      // PostgreSQL
      if (mysqlError.code === '23505') {
        throw new ConflictException(
          'Duplicate key value violates unique constraint.',
        );
      }

      if (mysqlError.code === '23503') {
        throw new BadRequestException('Foreign key constraint violation.');
      }

      if (mysqlError.code === '23502') {
        throw new BadRequestException(
          'Null value in column violates not-null constraint.',
        );
      }

      // Default fallback
      throw new InternalServerErrorException({
        description: 'Unexpected database error',
        message: mysqlError.message || 'An unknown error occurred.',
      });
    }
  }

  // Delete a user
  async deleteUser(id: number): Promise<{ deleted: boolean }> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return { deleted: true };
  }

  // Get user by id
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'User Not Found',
        message: `The user with id ${id} was not found.`,
        table: 'users',
        description: `The exception was thrown because the user with id ${id} does not exist in the database.`,
      });
    }

    return user;
  }
}
