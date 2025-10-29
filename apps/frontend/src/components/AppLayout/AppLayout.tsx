'use client';

import Sidebar from '@/components/Sidebar';
import type { AppLayoutProps } from './AppLayout.types';

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
