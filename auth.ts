import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/mongoose';
import { z } from 'zod';
import { getUserByEmail } from '@/lib/services/users';

// Define authentication schema for validation
const authSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(connectToDatabase as any),
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/verify-request',
    newUser: '/welcome',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error('No credentials provided');
          }

          // Parse and validate credentials with Zod
          const parsedCredentials = authSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
            throw new Error('Invalid credentials format');
          }

          const { email, password } = parsedCredentials.data;
          
          // Get the user from the database
          const user = await getUserByEmail(email);
          if (!user) {
            throw new Error('User not found');
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Return the user object without sensitive information
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id || user._id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
}); 