'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ProfileFormProps {
  initialData: any;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createMutation = useCreateProfile();
  const updateMutation = useUpdateProfile();

  const mutation = initialData ? updateMutation : createMutation;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutation.mutate(formData, {
      onSuccess: () => {
        startTransition(() => {
          router.push('/dashboard');
        });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mutation.isError && (
        <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
          {(mutation.error as any)?.error || 'An error occurred'}
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
          name="name"
          type="text"
          required
          placeholder="Your full name"
          defaultValue={initialData?.name || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder="Tell us about yourself..."
          defaultValue={initialData?.bio || ''}
        />
        <p className="text-xs text-muted-foreground">
          Maximum 500 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profileImageUrl">Profile Image URL</Label>
        <Input
          id="profileImageUrl"
          name="profileImageUrl"
          type="url"
          placeholder="https://example.com/your-image.jpg"
          defaultValue={initialData?.profileImageUrl || ''}
        />
        <p className="text-xs text-muted-foreground">
          Provide a URL to your profile image
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills / Tools *</Label>
        <Input
          id="skills"
          name="skills"
          type="text"
          required
          placeholder="React, TypeScript, Node.js"
          defaultValue={initialData?.skills?.join(', ') || ''}
        />
        <p className="text-xs text-muted-foreground">
          Comma-separated list of your skills and tools
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={mutation.isPending || isPending}>
        {mutation.isPending
          ? initialData
            ? 'Updating...'
            : 'Creating...'
          : isPending
          ? 'Redirecting...'
          : initialData
          ? 'Update Profile'
          : 'Create Profile'}
      </Button>
    </form>
  );
}
