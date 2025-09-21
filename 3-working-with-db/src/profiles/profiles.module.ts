import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class ProfilesModule {}
