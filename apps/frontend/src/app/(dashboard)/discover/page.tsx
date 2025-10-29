import { getAllProfiles } from '@/lib/actions/profile';
import { verifyAuth } from '@/lib/dal';
import { Search } from 'lucide-react';
import ProfilesSection from '@/components/ProfilesSection';
import type { Profile } from '@profile-creator/shared';

interface PageProps {
  searchParams: Promise<{ skills?: string }>;
}

export default async function DiscoverPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const skills = params.skills;
  const { user } = await verifyAuth();
  const allProfiles = await getAllProfiles(skills);

  // Filter out current user's profile
  const profiles = allProfiles.filter((profile: Profile) => profile.username !== user?.username);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Search className="h-8 w-8" />
            Discover Creators
          </h2>
          <p className="text-muted-foreground mt-2">
            Find creators by their skills and expertise
          </p>
        </div>

        <ProfilesSection profiles={profiles} />
      </div>
    </div>
  );
}
