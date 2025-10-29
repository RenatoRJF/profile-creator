'use client';

import { logout } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button variant="outline" type="submit">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </form>
  );
}
