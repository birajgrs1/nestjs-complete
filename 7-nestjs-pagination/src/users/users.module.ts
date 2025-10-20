import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Profile } from 'src/profiles/profile.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), PaginationModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
