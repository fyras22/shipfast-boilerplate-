import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Archive, RefreshCw } from 'lucide-react';
import DownloadCard from '@/app/components/DownloadCard';

export const metadata: Metadata = {
  title: 'Downloads | ShipFast Dashboard',
  description: 'Download the latest version of ShipFast Boilerplate',
};

// Mock function to get user licenses
function getUserActiveLicenses() {
  return [
    {
      id: 'lic_123456',
      planId: 'professional',
      planName: 'Professional',
      licenseKey: 'SHIP-PROF-1234-5678-9ABC',
      purchaseDate: '2023-12-15',
      expiryDate: '2024-12-15',
      isActive: true,
    }
  ];
}

// Mock function to get available versions
function getAvailableVersions() {
  return [
    {
      version: '1.2.0',
      releaseDate: '2024-01-20',
      isLatest: true,
      size: '12.4 MB',
      changelog: [
        'Added support for multiple authentication providers',
        'Improved responsive dashboard layout',
        'Enhanced API security with rate limiting',
        'Fixed issue with dark mode toggle persistence',
        'Updated dependencies to latest versions'
      ]
    },
    {
      version: '1.1.0',
      releaseDate: '2023-11-15',
      isLatest: false,
      size: '11.8 MB',
      changelog: [
        'Added internationalization (i18n) support',
        'Improved form validation with better error messages',
        'Optimized build process for faster deployment',
        'Added more UI components to the component library'
      ]
    },
    {
      version: '1.0.0',
      releaseDate: '2023-09-01',
      isLatest: false,
      size: '10.2 MB',
      changelog: [
        'Initial release of ShipFast Boilerplate',
        'Next.js 14 App Router',
        'MongoDB integration with Mongoose',
        'Authentication with NextAuth.js',
        'TailwindCSS for styling'
      ]
    }
  ];
}

function DownloadsContent() {
  const licenses = getUserActiveLicenses();
  const activeUserLicense = licenses.length > 0 ? licenses[0] : null;
  const versions = getAvailableVersions();
  
  if (!activeUserLicense) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">No Active License</h2>
        <p className="text-amber-700 dark:text-amber-400 mb-4">
          You don't have any active licenses to download the boilerplate.
        </p>
        <Link 
          href="/pricing" 
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md inline-flex items-center"
        >
          <Archive className="w-4 h-4 mr-2" />
          Purchase a License
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Active License</h2>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {activeUserLicense.planName}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          License Key: <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded font-mono">{activeUserLicense.licenseKey}</code>
        </p>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Valid until: {new Date(activeUserLicense.expiryDate).toLocaleDateString()}
          </span>
          <Link 
            href={`/dashboard/licenses/${activeUserLicense.id}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Details
          </Link>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Available Downloads</h2>
        <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {versions.map((version) => (
          <DownloadCard 
            key={version.version}
            licenseKey={activeUserLicense.licenseKey}
            versionInfo={version}
          />
        ))}
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mt-2">Downloads</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Download the latest version of ShipFast Boilerplate
        </p>
      </div>
      
      <Suspense fallback={<div>Loading downloads...</div>}>
        <DownloadsContent />
      </Suspense>
    </div>
  );
} 