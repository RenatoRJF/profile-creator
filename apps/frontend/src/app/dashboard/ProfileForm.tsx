'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { profileSchema, type ProfileFormData } from '@/lib/schemas/profile';
import type { Profile } from '@profile-creator/shared';

interface ProfileFormProps {
  initialData: Profile | null;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createMutation = useCreateProfile();
  const updateMutation = useUpdateProfile();

  const mutation = initialData ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name || '',
      bio: initialData?.bio || '',
      profileImageUrl: initialData?.profileImageUrl || '',
      skills: initialData?.skills?.join(', ') || '',
    },
  });

  async function onSubmit(data: ProfileFormData) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('bio', data.bio || '');
    formData.append('profileImageUrl', data.profileImageUrl || '');
    formData.append('skills', data.skills);

    mutation.mutate(formData, {
      onSuccess: () => {
        startTransition(() => {
          router.push('/dashboard');
        });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {mutation.isError && (
        <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
          {mutation.error instanceof Error ? mutation.error.message : 'An error occurred'}
        </div>
      )}
      {mutation.isSuccess && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm">
          {initialData ? 'Profile updated successfully!' : 'Profile created successfully!'}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          rows={4}
          placeholder="Tell us about yourself..."
          {...register('bio')}
        />
        {errors.bio && (
          <p className="text-xs text-destructive">{errors.bio.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Maximum 500 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profileImageUrl">Profile Image URL</Label>
        <Input
          id="profileImageUrl"
          type="url"
          placeholder="https://example.com/your-image.jpg"
          {...register('profileImageUrl')}
        />
        {errors.profileImageUrl && (
          <p className="text-xs text-destructive">{errors.profileImageUrl.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Provide a URL to your profile image
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills / Tools *</Label>
        <Input
          id="skills"
          type="text"
          placeholder="React, TypeScript, Node.js"
          {...register('skills')}
        />
        {errors.skills && (
          <p className="text-xs text-destructive">{errors.skills.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Comma-separated list of your skills and tools
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending || isPending || isSubmitting}
      >
        {mutation.isPending
          ? initialData
            ? 'Updating...'
            : 'Creating...'
          : isPending
          ? 'Redirecting...'
          : isSubmitting
          ? 'Validating...'
          : initialData
          ? 'Update Profile'
          : 'Create Profile'}
      </Button>
    </form>
  );
}
