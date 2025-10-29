'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/actions/auth';
import type { SidebarProps } from './Sidebar.types';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Discover', href: '/discover', icon: Search },
  { name: 'My Profile', href: '/profile/edit', icon: Settings },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  return (
    <aside className="w-64 border-r bg-background h-screen sticky top-0 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">Profile Creator</h1>
            <p className="text-xs text-muted-foreground">Connect with creators</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = activePath === item.href || activePath.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-secondary font-medium'
                )}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout at bottom */}
      <div className="p-4 border-t">
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </form>
      </div>
    </aside>
  );
}
