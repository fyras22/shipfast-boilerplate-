import { z } from 'zod';

/**
 * Environment variable validation schema
 */
const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // MongoDB
  MONGODB_URI: z.string().min(1),
  
  // Authentication
  AUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url().optional(),
  
  // Encryption
  ENCRYPTION_KEY: z.string().min(32),
  
  // Email (optional)
  EMAIL_SERVER_HOST: z.string().optional(),
  EMAIL_SERVER_PORT: z.string().optional().transform(Number).optional(),
  EMAIL_SERVER_USER: z.string().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  
  // Analytics (optional)
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
});

/**
 * Parse and validate environment variables
 */
export const env = envSchema.parse(process.env);

/**
 * For client-side environment variables
 */
export const clientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
};

/**
 * Type definition for validated environment variables
 */
export type Env = z.infer<typeof envSchema>; 