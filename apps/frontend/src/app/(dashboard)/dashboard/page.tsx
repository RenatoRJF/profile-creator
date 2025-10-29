import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/dal';
import { getMyProfile } from '@/lib/actions/profile';
import { getInitials } from '@/lib/utils/avatar';
import { UserCircle, Search, Edit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function DashboardPage() {
  const { isAuth, user } = await verifyAuth();

  if (!isAuth) {
    redirect('/login');
  }

  const profile = await getMyProfile();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}!</h2>
            <p className="text-muted-foreground mt-2">
              Manage your profile and connect with other creators
            </p>
          </div>

          {/* Profile Overview Card */}
          {profile ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Profile</CardTitle>
                  <Link href="/profile/edit">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.profileImageUrl} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{profile.name}</h3>
                      <p className="text-muted-foreground">@{user?.username}</p>
                    </div>
                    {profile.bio && (
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  Create Your Profile
                </CardTitle>
                <CardDescription>
                  Set up your profile to connect with other creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/profile/edit">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Create Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  Your Public Profile
                </CardTitle>
                <CardDescription>
                  See how other users view your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile ? (
                  <Link href={`/profile/${user?.username}`}>
                    <Button variant="outline" className="w-full">
                      View Public Profile
                    </Button>
                  </Link>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Create your profile to have a public page
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Discover Creators
                </CardTitle>
                <CardDescription>
                  Find and connect with other creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/discover">
                  <Button variant="outline" className="w-full">
                    Explore Creators
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
