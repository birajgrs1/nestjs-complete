import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { Profile } from 'src/profiles/profile.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), PaginationModule],
  controllers: [UsersController], // Add this to register the controller
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
