'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import type { ProfilesSectionProps } from './ProfilesSection.types';

export default function ProfilesSection({ profiles }: ProfilesSectionProps) {
  const [isSearching, setIsSearching] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsSearching(false);
  }, [searchParams]);

  const handleSearchStart = () => {
    setIsSearching(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search by Skills</CardTitle>
          <CardDescription>
            Filter creators by their skills (e.g., React, TypeScript, Design)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchForm onSearchStart={handleSearchStart} />
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {isSearching ? (
            <Skeleton className="h-7 w-48 inline-block" />
          ) : (
            `${profiles.length} ${profiles.length === 1 ? 'Creator' : 'Creators'} Found`
          )}
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isSearching ? (
            // Show skeleton cards while searching
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Show actual profiles
            profiles.map((profile) => (
            <Link key={profile.id} href={`/profile/${profile.username}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile.profileImageUrl} alt={profile.name} />
                      <AvatarFallback className="text-lg">
                        {profile.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">{profile.name}</CardTitle>
                      <CardDescription className="truncate">
                        @{profile.username}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {profile.bio && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {profile.bio}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 5 && (
                      <Badge variant="outline">+{profile.skills.length - 5} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))
          )}
        </div>

        {profiles.length === 0 && !isSearching && (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No creators found. Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
