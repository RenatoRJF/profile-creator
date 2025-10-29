import { getAllProfiles } from '@/lib/actions/profile';
import { verifyAuth } from '@/lib/dal';
import { Search, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <h1 className="text-xl font-bold">Creator Profile</h1>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </main>
    </div>
  );
}
