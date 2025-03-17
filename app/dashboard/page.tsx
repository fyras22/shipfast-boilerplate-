import { auth } from '@/auth';
import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export const metadata = {
  title: 'Dashboard',
  description: 'View your dashboard and statistics.',
};

export default async function DashboardPage() {
  // Check if user is authenticated
  const session = await auth();
  
  if (!session) {
    // Redirect to login if not authenticated
    redirect('/login');
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-fluid-3 font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {session.user.name || 'User'}
          </p>
        </div>
        <div>
          <Link 
            href="/dashboard/settings" 
            className="btn btn-outline btn-sm"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* Stats Cards with Suspense for loading state */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-fluid-2 font-semibold mb-4">Recent Activity</h2>
        <Suspense fallback={<p>Loading activity...</p>}>
          <RecentActivity userId={session.user.id} />
        </Suspense>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-fluid-2 font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/dashboard/create" 
            className="card-custom p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium">Create New</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add a new item to your collection</p>
          </Link>
          
          <Link 
            href="/dashboard/reports" 
            className="card-custom p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium">View Reports</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">See your performance metrics</p>
          </Link>
          
          <Link 
            href="/dashboard/profile" 
            className="card-custom p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium">Profile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your account settings</p>
          </Link>
          
          <Link 
            href="/dashboard/help" 
            className="card-custom p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium">Help</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get support and documentation</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 