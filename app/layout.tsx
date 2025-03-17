import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import Link from 'next/link';

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

function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b">
      <div className="container-custom">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/terms">License Terms</Link></li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">ShipFast</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/terms">License Terms</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/pricing" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
} 