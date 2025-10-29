import { IsString, IsOptional, IsArray, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsUrl()
  profileImageUrl?: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
