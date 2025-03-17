import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'ShipFast Boilerplate',
    template: '%s | ShipFast Boilerplate',
  },
  description: 'High-performance Next.js 14 boilerplate with App Router, MongoDB, NextAuth, and TypeScript.',
  keywords: ['nextjs', 'react', 'typescript', 'mongodb', 'tailwindcss', 'daisyui', 'boilerplate'],
  authors: [{ name: 'ShipFast Team' }],
  creator: 'ShipFast Team',
  publisher: 'ShipFast',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ShipFast Boilerplate',
    description: 'High-performance Next.js 14 boilerplate with App Router, MongoDB, NextAuth, and TypeScript.',
    siteName: 'ShipFast Boilerplate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShipFast Boilerplate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShipFast Boilerplate',
    description: 'High-performance Next.js 14 boilerplate with App Router, MongoDB, NextAuth, and TypeScript.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
} 