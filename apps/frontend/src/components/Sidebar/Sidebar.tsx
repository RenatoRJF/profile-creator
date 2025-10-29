'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/actions/auth';
import { useSidebarStore } from '@/stores/useSidebarStore';
import type { SidebarProps } from './Sidebar.types';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Discover', href: '/discover', icon: Search },
  { name: 'My Profile', href: '/profile/edit', icon: Settings },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;
  const { isOpen, toggle, close } = useSidebarStore();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      close();
    }
  }, [pathname, close]);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">Profile Creator</h1>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'w-64 border-r bg-background h-screen flex flex-col transition-transform duration-300 ease-in-out',
          // Mobile: fixed and slides in/out
          'fixed top-0 left-0 z-50 lg:relative lg:z-auto',
          // Desktop: always visible when open (handled by parent wrapper)
          'lg:sticky lg:top-0',
          // Translation
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Profile Creator</h1>
              <p className="text-xs text-muted-foreground">Connect with creators</p>
            </div>
          </Link>
          {/* Desktop toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="hidden lg:flex"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = activePath === item.href || activePath.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} onClick={close}>
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

      {/* Floating toggle button when sidebar is closed (desktop only) */}
      {!isOpen && (
        <Button
          variant="default"
          size="icon"
          onClick={toggle}
          className="hidden lg:flex fixed top-6 left-6 z-50 shadow-lg rounded-full"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
