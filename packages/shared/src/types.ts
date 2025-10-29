export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  bio?: string;
  profileImageUrl?: string;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
  username?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface SignupInput {
  email: string;
  password: string;
  username: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateProfileInput {
  name: string;
  bio?: string;
  profileImageUrl?: string;
  skills: string[];
}

export interface UpdateProfileInput {
  name?: string;
  bio?: string;
  profileImageUrl?: string;
  skills?: string[];
}
