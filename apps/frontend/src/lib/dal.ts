import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { verifySession } from './session';

export const verifyAuth = cache(async () => {
  const session = await verifySession();

  if (!session) {
    return { isAuth: false, userId: null, user: null };
  }

  return { isAuth: true, userId: session.userId, user: session.user };
});

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}
