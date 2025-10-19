import {
  Injectable,
  Logger,
  NotFoundException,
  // RequestTimeoutException,
  // ConflictException,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profiles/profile.entity';
import { UserAlreadyExistsException } from 'src/Custom/user-already-exists.exception';

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
  // Create a new user with custom exception handling
  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      userDto.profile = userDto.profile ?? {};

      const user = this.userRepository.create(userDto as DeepPartial<User>);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user', error);

      const dbError = error as {
        code?: string;
        errno?: number;
        message?: string;
      };

      // MySQL: Duplicate entry
      if (dbError.code === 'ER_DUP_ENTRY' && dbError.errno === 1062) {
        throw new UserAlreadyExistsException(
          `A user with the email '${userDto.email}' already exists in the system.`,
        );
      }

      // PostgreSQL: Unique violation
      if (dbError.code === '23505') {
        throw new UserAlreadyExistsException(
          `A user with the email '${userDto.email}' already exists (PostgreSQL unique constraint).`,
        );
      }

      // PostgreSQL: Foreign key violation
      if (dbError.code === '23503') {
        throw new BadRequestException('Foreign key constraint violation.');
      }

      // PostgreSQL: Not-null constraint violation
      if (dbError.code === '23502') {
        throw new BadRequestException(
          'Null value in column violates not-null constraint.',
        );
      }

      throw new InternalServerErrorException({
        description: 'Unexpected database error',
        message: dbError.message || 'An unknown error occurred.',
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
