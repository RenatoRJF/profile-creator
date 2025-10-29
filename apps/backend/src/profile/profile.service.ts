import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(userId: string, createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    // Check if profile already exists
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }

    const profile = await this.prisma.profile.create({
      data: {
        userId,
        name: createProfileDto.name,
        bio: createProfileDto.bio,
        profileImageUrl: createProfileDto.profileImageUrl,
        skills: JSON.stringify(createProfileDto.skills),
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return new ProfileEntity({
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      bio: profile.bio,
      profileImageUrl: profile.profileImageUrl,
      skills: JSON.parse(profile.skills),
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      username: profile.user.username,
    });
  }

  async getMyProfile(userId: string): Promise<ProfileEntity | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!profile) {
      return null;
    }

    return new ProfileEntity({
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      bio: profile.bio,
      profileImageUrl: profile.profileImageUrl,
      skills: JSON.parse(profile.skills),
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      username: profile.user.username,
    });
  }

  async getProfileByUsername(username: string): Promise<ProfileEntity> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
      },
    });

    if (!user || !user.profile) {
      throw new NotFoundException('Profile not found');
    }

    return new ProfileEntity({
      id: user.profile.id,
      userId: user.profile.userId,
      name: user.profile.name,
      bio: user.profile.bio,
      profileImageUrl: user.profile.profileImageUrl,
      skills: JSON.parse(user.profile.skills),
      createdAt: user.profile.createdAt,
      updatedAt: user.profile.updatedAt,
      username: user.username,
    });
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    const updateData: any = {};
    if (updateProfileDto.name !== undefined) updateData.name = updateProfileDto.name;
    if (updateProfileDto.bio !== undefined) updateData.bio = updateProfileDto.bio;
    if (updateProfileDto.profileImageUrl !== undefined)
      updateData.profileImageUrl = updateProfileDto.profileImageUrl;
    if (updateProfileDto.skills !== undefined)
      updateData.skills = JSON.stringify(updateProfileDto.skills);

    const profile = await this.prisma.profile.update({
      where: { userId },
      data: updateData,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return new ProfileEntity({
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      bio: profile.bio,
      profileImageUrl: profile.profileImageUrl,
      skills: JSON.parse(profile.skills),
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      username: profile.user.username,
    });
  }

  async getAllProfiles(skills?: string): Promise<ProfileEntity[]> {
    const profiles = await this.prisma.profile.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    let filteredProfiles = profiles.map((profile) => {
      return new ProfileEntity({
        id: profile.id,
        userId: profile.userId,
        name: profile.name,
        bio: profile.bio,
        profileImageUrl: profile.profileImageUrl,
        skills: JSON.parse(profile.skills),
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        username: profile.user.username,
      });
    });

    // Filter by skills if provided
    if (skills) {
      const searchSkills = skills.toLowerCase().split(',').map((s) => s.trim());
      filteredProfiles = filteredProfiles.filter((profile) =>
        profile.skills.some((skill) =>
          searchSkills.some((searchSkill) => skill.toLowerCase().includes(searchSkill)),
        ),
      );
    }

    return filteredProfiles;
  }
}
