'use client';

import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar wrapper - takes space when open, collapses when closed */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isOpen ? 'w-64' : 'w-0',
          'hidden lg:block'
        )}
      >
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      <main
        className={cn(
          'flex-1 overflow-auto pt-16 lg:pt-0 transition-all duration-300',
        )}
      >
        {children}
      </main>
    </div>
  );
}
