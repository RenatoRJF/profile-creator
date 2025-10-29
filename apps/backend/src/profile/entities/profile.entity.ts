export class ProfileEntity {
  id: string;
  userId: string;
  name: string;
  bio?: string;
  profileImageUrl?: string;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
  username?: string; // Optional, for public profile display

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }
}
