import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyProfile, getAllProfiles, getProfileByUsername, createProfile, updateProfile } from '@/lib/actions/profile';

// Query keys
export const profileKeys = {
  all: ['profiles'] as const,
  lists: () => [...profileKeys.all, 'list'] as const,
  list: (skills?: string) => [...profileKeys.lists(), { skills }] as const,
  details: () => [...profileKeys.all, 'detail'] as const,
  detail: (username: string) => [...profileKeys.details(), username] as const,
  my: () => [...profileKeys.all, 'my'] as const,
};

// Get my profile
export function useMyProfile() {
  return useQuery({
    queryKey: profileKeys.my(),
    queryFn: getMyProfile,
  });
}

// Get all profiles
export function useProfiles(skills?: string) {
  return useQuery({
    queryKey: profileKeys.list(skills),
    queryFn: () => getAllProfiles(skills),
  });
}

// Get profile by username
export function useProfileByUsername(username: string) {
  return useQuery({
    queryKey: profileKeys.detail(username),
    queryFn: () => getProfileByUsername(username),
    enabled: !!username,
  });
}

// Create profile mutation
export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.my() });
      queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
    },
  });
}

// Update profile mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.my() });
      queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
    },
  });
}
