'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

/**
 * NextAuth authentication provider component
 * Wraps the application to provide authentication context
 */
export function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
} 