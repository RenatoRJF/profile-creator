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

      {/* Desktop toggle button - fixed position so it doesn't scroll */}
      {isOpen && (
        <button
          onClick={() => useSidebarStore.getState().toggle()}
          className="hidden lg:flex fixed top-6 left-60 z-50 items-center justify-center w-8 h-8 rounded-full border border-border bg-background shadow-md hover:bg-accent transition-all duration-300"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

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
