import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserEntity } from '../auth/entities/user.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @CurrentUser() user: UserEntity,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createProfile(user.id, createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@CurrentUser() user: UserEntity) {
    const profile = await this.profileService.getMyProfile(user.id);
    if (!profile) {
      return null;
    }
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMyProfile(
    @CurrentUser() user: UserEntity,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user.id, updateProfileDto);
  }

  @Get('username/:username')
  async getProfileByUsername(@Param('username') username: string) {
    return this.profileService.getProfileByUsername(username);
  }

  @Get('all')
  async getAllProfiles(@Query('skills') skills?: string) {
    return this.profileService.getAllProfiles(skills);
  }
}
