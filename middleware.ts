import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Define paths that should be exempt from rate limiting
const RATE_LIMIT_EXEMPT_PATHS = [
  // Static files
  /^\/(_next|static|favicon\.ico|robots\.txt|sitemap\.xml)/,
  // Public assets
  /^\/public/,
  // Health check endpoint
  /^\/api\/health/,
];

// Define paths that should be protected (require authentication)
const PROTECTED_PATHS = [
  /^\/dashboard/,
  /^\/account/,
  /^\/api\/((?!auth|public).)*$/, // All API routes except auth and public ones
];

// Setup rate limiting with Upstash Redis
// In a real app, you'd use Upstash Redis with authentication
let ratelimit: Ratelimit | undefined;

if (
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1m'), // 100 requests per minute
    analytics: true,
  });
}

export async function middleware(request: NextRequest) {
  // Clone the original response to work with
  const response = NextResponse.next();

  // Add security headers to all responses
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Check if path should be rate limited
  const shouldRateLimit = !RATE_LIMIT_EXEMPT_PATHS.some(pattern => 
    pattern.test(request.nextUrl.pathname)
  );

  // Apply rate limiting if configured and path should be rate limited
  if (ratelimit && shouldRateLimit) {
    const ip = request.ip ?? '127.0.0.1';
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // Set RateLimit headers
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset.toString());

    // If rate limit exceeded, return 429 Too Many Requests
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          ...Object.fromEntries(response.headers),
        },
      });
    }
  }

  // Check if path is protected
  const isProtectedPath = PROTECTED_PATHS.some(pattern => 
    pattern.test(request.nextUrl.pathname)
  );

  // If path is protected, check for authentication
  if (isProtectedPath) {
    // Get token from cookies
    const authToken = request.cookies.get('next-auth.session-token')?.value ||
                      request.cookies.get('__Secure-next-auth.session-token')?.value;

    // If no token, redirect to login page
    if (!authToken) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (static files)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}; 