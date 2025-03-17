import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'License Details | ShipFast Boilerplate',
  description: 'Manage your license details and access',
};

// Mock function to get a license by ID
async function getLicenseById(id: string) {
  // In a real app, this would fetch from a database
  const licenses = [
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
      purchaseAmount: 149,
      currency: 'USD',
      allowedProjects: 'Unlimited',
      allowedDomains: 'Unlimited',
      supportLevel: 'Priority Email',
      githubAccess: true,
      activations: [
        { id: 'act_1', domain: 'example.com', activatedOn: '2023-12-16', lastActive: '2024-02-18' },
        { id: 'act_2', domain: 'client-project.dev', activatedOn: '2024-01-05', lastActive: '2024-02-15' }
      ],
      downloadHistory: [
        { id: 'dl_1', version: 'v1.0.0', downloadedOn: '2023-12-15', ipAddress: '192.168.1.1' },
        { id: 'dl_2', version: 'v1.1.0', downloadedOn: '2024-01-10', ipAddress: '192.168.1.1' },
        { id: 'dl_3', version: 'v1.2.0', downloadedOn: '2024-01-20', ipAddress: '192.168.1.2' }
      ]
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
      purchaseAmount: 49,
      currency: 'USD',
      allowedProjects: '1',
      allowedDomains: '1',
      supportLevel: 'Community',
      githubAccess: false,
      activations: [
        { id: 'act_3', domain: 'personal-project.com', activatedOn: '2023-10-06', lastActive: '2023-12-20' }
      ],
      downloadHistory: [
        { id: 'dl_4', version: 'v1.0.0', downloadedOn: '2023-10-05', ipAddress: '192.168.1.3' }
      ]
    }
  ];
  
  const license = licenses.find(lic => lic.id === id);
  return license;
}

export default async function LicenseDetailsPage({ params }: { params: { id: string } }) {
  const license = await getLicenseById(params.id);
  
  if (!license) {
    notFound();
  }
  
  // Calculate days remaining until expiry
  const today = new Date();
  const expiryDate = new Date(license.expiryDate);
  const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        <section className="py-12">
          <div className="container-custom">
            <div className="mb-8">
              <Link href="/dashboard" className="flex items-center text-sm text-gray-600 hover:text-primary-500 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Dashboard
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{license.planName} License</h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    License ID: {license.id}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <Link href={`/api/download?licenseId=${license.id}`} className="btn btn-primary">
                    Download Latest Version
                  </Link>
                  <button className="btn btn-outline">
                    Renew License
                  </button>
                </div>
              </div>
            </div>
            
            {/* License Status Card */}
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h2 className="card-title mb-4">License Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <p className="text-sm text-gray-500">License Key</p>
                        <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm mt-1">{license.licenseKey}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="mt-1">
                          {license.isActive ? (
                            <span className="badge badge-success">Active</span>
                          ) : (
                            <span className="badge badge-error">Expired</span>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Purchase Date</p>
                        <p className="mt-1">{license.purchaseDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p className="mt-1">
                          {license.expiryDate}
                          {daysRemaining > 0 && (
                            <span className="text-sm text-gray-500 ml-2">({daysRemaining} days remaining)</span>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Amount Paid</p>
                        <p className="mt-1">{license.currency} {license.purchaseAmount}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Last Download</p>
                        <p className="mt-1">{license.lastDownload}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="card-title mb-4">License Entitlements</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <p className="text-sm text-gray-500">Allowed Projects</p>
                        <p className="mt-1">{license.allowedProjects}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Allowed Domains</p>
                        <p className="mt-1">{license.allowedDomains}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Support Level</p>
                        <p className="mt-1">{license.supportLevel}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">GitHub Access</p>
                        <p className="mt-1">
                          {license.githubAccess ? (
                            <span className="text-green-500">Included</span>
                          ) : (
                            <span className="text-gray-500">Not Included</span>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Download Count</p>
                        <p className="mt-1">{license.downloadCount} / Unlimited</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Activation Count</p>
                        <p className="mt-1">{license.activations.length} / {license.planId === 'personal' ? '1' : 'Unlimited'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activations */}
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title">Active Domains</h2>
                  {license.planId !== 'personal' && (
                    <button className="btn btn-sm btn-outline">Add Domain</button>
                  )}
                </div>
                
                {license.activations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Domain</th>
                          <th>Activated On</th>
                          <th>Last Active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {license.activations.map((activation) => (
                          <tr key={activation.id}>
                            <td>{activation.domain}</td>
                            <td>{activation.activatedOn}</td>
                            <td>{activation.lastActive}</td>
                            <td>
                              <button className="btn btn-xs btn-error">Deactivate</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    No active domains yet.
                  </div>
                )}
              </div>
            </div>
            
            {/* Download History */}
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title mb-4">Download History</h2>
                
                {license.downloadHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Version</th>
                          <th>Downloaded On</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {license.downloadHistory.map((download) => (
                          <tr key={download.id}>
                            <td>{download.version}</td>
                            <td>{download.downloadedOn}</td>
                            <td>{download.ipAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    No download history yet.
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">License Actions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="btn btn-outline">Download Invoice</button>
                  <button className="btn btn-outline">Request Support</button>
                  <button className="btn btn-outline">Transfer License</button>
                  {license.githubAccess && (
                    <Link href="https://github.com/fyras22/shipfast-boilerplate-" className="btn btn-outline">
                      Access GitHub Repo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 