import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/dal';
import { getMyProfile } from '@/lib/actions/profile';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import ProfileForm from '../../dashboard/ProfileForm';

export default async function EditProfilePage() {
  const { isAuth, user } = await verifyAuth();

  if (!isAuth) {
    redirect('/login');
  }

  const profile = await getMyProfile();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {profile ? 'Edit Your Profile' : 'Create Your Profile'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {profile
              ? 'Update your information to help others find you'
              : 'Share your information with the community'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              This information will be displayed on your public profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm initialData={profile} />
          </CardContent>
        </Card>

        {profile && (
          <Card>
            <CardHeader>
              <CardTitle>Your Public Profile</CardTitle>
              <CardDescription>
                This is how other users will see your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/profile/${user?.username}`}>
                <Button>View Public Profile</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
