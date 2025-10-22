import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getAllProfiles(): Promise<Profile[]> {
    return this.profileRepository.find({
      relations: {
        //apply eager loading
        user: true,
      },
    });
  }
}
