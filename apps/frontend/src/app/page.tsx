import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Search, Settings, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <h1 className="text-xl font-bold">Creator Profile</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-5xl font-bold tracking-tight">
            Connect with Creative Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build your profile, showcase your skills, and discover talented creators
            in your field.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Create Your Profile</Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Discover Creators
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-20">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>
                Build a professional profile showcasing your name, bio, skills, and expertise
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Discover Talent</CardTitle>
              <CardDescription>
                Find creators by searching for specific skills and tools in our community
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Secure & Simple</CardTitle>
              <CardDescription>
                Built with modern security practices and an intuitive interface
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Built with Next.js 16, NestJS, and Prisma
          </p>
        </div>
      </footer>
    </div>
  );
}
