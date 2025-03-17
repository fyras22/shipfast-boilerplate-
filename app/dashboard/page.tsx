import { auth } from '@/auth';
import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export const metadata = {
  title: 'Customer Dashboard | ShipFast Boilerplate',
  description: 'Manage your ShipFast licenses and downloads',
};

// This would be a server component in a real application
// that fetches the user's licenses from the database
async function getLicenses() {
  // Mock data - in a real app this would come from a database
  return [
    {
      id: 'lic_123456',
      planId: 'professional',
      planName: 'Professional',
      purchaseDate: '2023-12-15',
      expiryDate: '2024-12-15',
      licenseKey: 'SHIP-PROF-1234-5678-9ABC',
      isActive: true,
      downloadCount: 3,
      lastDownload: '2024-01-20',
    },
    {
      id: 'lic_789012',
      planId: 'personal',
      planName: 'Personal',
      purchaseDate: '2023-10-05',
      expiryDate: '2024-04-05',
      licenseKey: 'SHIP-PERS-9876-5432-DCBA',
      isActive: true,
      downloadCount: 1,
      lastDownload: '2023-10-05',
    }
  ];
}

export default async function DashboardPage() {
  const licenses = await getLicenses();
  
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage your licenses, downloads, and account details
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/pricing" className="btn btn-primary">
                  Purchase New License
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Active Licenses</div>
                  <div className="stat-value text-primary">{licenses.filter(l => l.isActive).length}</div>
                </div>
              </div>
              
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Total Downloads</div>
                  <div className="stat-value text-secondary">{licenses.reduce((acc, l) => acc + l.downloadCount, 0)}</div>
                </div>
              </div>
              
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-info">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Support Eligibility</div>
                  <div className="stat-value text-info">Active</div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">Your Licenses</h2>
              
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>License</th>
                      <th>Purchase Date</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {licenses.map((license) => (
                      <tr key={license.id}>
                        <td>
                          <div className="font-bold">{license.planName}</div>
                          <div className="text-sm opacity-70">{license.licenseKey}</div>
                        </td>
                        <td>{license.purchaseDate}</td>
                        <td>{license.expiryDate}</td>
                        <td>
                          {license.isActive ? (
                            <div className="badge badge-success gap-2">Active</div>
                          ) : (
                            <div className="badge badge-error gap-2">Expired</div>
                          )}
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <Link href={`/api/download?licenseId=${license.id}`} className="btn btn-sm">
                              Download
                            </Link>
                            <Link href={`/dashboard/licenses/${license.id}`} className="btn btn-sm btn-outline">
                              Details
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Updates & Announcements</h2>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold">New Release: v1.2.0</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We've released version 1.2.0 with improved authentication and new UI components.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">February 15, 2024</p>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-semibold">Security Update</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Important security patch released for NextAuth integration.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">January 22, 2024</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Holiday Discount</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use code HOLIDAY25 for 25% off any additional licenses.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">December 15, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Support & Resources</h2>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://docs.shipfast-boilerplate.com" className="flex items-center hover:text-primary-500">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/fyras22/shipfast-boilerplate-/issues" className="flex items-center hover:text-primary-500">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        FAQ & Knowledge Base
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/fyras22/shipfast-boilerplate-/discussions" className="flex items-center hover:text-primary-500">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                        </svg>
                        Community Forums
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="flex items-center hover:text-primary-500">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Contact Support
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard/tickets" className="flex items-center hover:text-primary-500">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                        </svg>
                        Support Tickets
                      </a>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <Link href="/contact" className="btn btn-outline btn-block">
                      Contact Our Team
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 