import 'server-only';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

// Backend JWT payload structure
export interface BackendJwtPayload {
  sub: string;      // userId
  email: string;
  username: string;
  iat: number;
  exp: number;
}

// Transformed session for frontend use
export interface SessionPayload {
  userId: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
  expiresAt: Date;
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });

    const backendPayload = payload as unknown as BackendJwtPayload;

    // Transform backend JWT to frontend session format
    return {
      userId: backendPayload.sub,
      user: {
        id: backendPayload.sub,
        email: backendPayload.email,
        username: backendPayload.username,
      },
      expiresAt: new Date(backendPayload.exp * 1000),
    };
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}
