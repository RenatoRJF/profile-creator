export interface Profile {
  id: string;
  name: string;
  username: string;
  bio?: string;
  profileImageUrl?: string;
  skills: string[];
}

export interface ProfilesSectionProps {
  profiles: Profile[];
}
