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
      <Sidebar />
      <main
        className={cn(
          'flex-1 overflow-auto pt-16 lg:pt-0 transition-all duration-300',
          isOpen ? 'lg:ml-0' : 'lg:ml-0'
        )}
      >
        {children}
      </main>
    </div>
  );
}
