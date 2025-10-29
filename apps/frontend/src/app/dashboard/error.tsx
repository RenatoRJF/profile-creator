'use client';

import { useEffect } from 'react';
import { User, Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <h1 className="text-xl font-bold">Creator Profile</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/discover">
                <Button variant="outline">Discover Creators</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-2">
              Manage your profile and connect with other creators
            </p>
          </div>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Something went wrong
              </CardTitle>
              <CardDescription>
                We encountered an error while loading your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {error.message || 'An unexpected error occurred'}
              </p>
              <div className="flex gap-4">
                <Button onClick={reset}>Try Again</Button>
                <Link href="/discover">
                  <Button variant="outline">Go to Discover</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Back to Login</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
