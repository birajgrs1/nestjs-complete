import { Controller, Get } from '@nestjs/common';
import { Profile } from './profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async getAllProfiles(): Promise<Profile[]> {
    return this.profilesService.getAllProfiles();
  }
}
