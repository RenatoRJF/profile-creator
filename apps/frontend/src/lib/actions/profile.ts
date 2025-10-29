'use server';

import { getAuthToken } from '../dal';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function createProfile(formData: FormData) {
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const profileImageUrl = formData.get('profileImageUrl') as string;
  const skillsRaw = formData.get('skills') as string;

  if (!name || !skillsRaw) {
    return { error: 'Name and skills are required' };
  }

  const skills = skillsRaw.split(',').map((s) => s.trim()).filter(Boolean);

  const token = await getAuthToken();
  if (!token) {
    return { error: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        bio: bio || undefined,
        profileImageUrl: profileImageUrl || undefined,
        skills,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to create profile' };
    }

    revalidatePath('/dashboard');
    return { success: true, profile: data };
  } catch (error) {
    console.error('Create profile error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function updateProfile(formData: FormData) {
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const profileImageUrl = formData.get('profileImageUrl') as string;
  const skillsRaw = formData.get('skills') as string;

  const token = await getAuthToken();
  if (!token) {
    return { error: 'Not authenticated' };
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (bio !== undefined) updateData.bio = bio;
  if (profileImageUrl !== undefined) updateData.profileImageUrl = profileImageUrl;
  if (skillsRaw) {
    updateData.skills = skillsRaw.split(',').map((s) => s.trim()).filter(Boolean);
  }

  try {
    const response = await fetch(`${API_URL}/profile/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to update profile' };
    }

    revalidatePath('/dashboard');
    revalidatePath('/profile/[username]');
    return { success: true, profile: data };
  } catch (error) {
    console.error('Update profile error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function getMyProfile() {
  const token = await getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const text = await response.text();
    if (!text) {
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

export async function getAllProfiles(skills?: string) {
  try {
    const url = skills
      ? `${API_URL}/profile/all?skills=${encodeURIComponent(skills)}`
      : `${API_URL}/profile/all`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const text = await response.text();
    if (!text) {
      return [];
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('Get all profiles error:', error);
    return [];
  }
}

export async function getProfileByUsername(username: string) {
  try {
    const response = await fetch(`${API_URL}/profile/username/${username}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const text = await response.text();
    if (!text) {
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('Get profile by username error:', error);
    return null;
  }
}
