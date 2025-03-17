import React from 'react';

// This would normally fetch data from a database
async function getStats() {
  // Simulate loading time to demonstrate Suspense
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalUsers: 1254,
    activeProjects: 42,
    conversionRate: 12.5,
    revenue: 8547.63
  };
}

export async function DashboardStats() {
  // Fetch data asynchronously (this component is a Server Component)
  const stats = await getStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Users" 
        value={stats.totalUsers.toLocaleString()} 
        trend="+12%" 
        trendUp={true} 
      />
      <StatCard 
        title="Active Projects" 
        value={stats.activeProjects.toString()} 
        trend="+7%" 
        trendUp={true} 
      />
      <StatCard 
        title="Conversion Rate" 
        value={`${stats.conversionRate}%`} 
        trend="-2.3%" 
        trendUp={false} 
      />
      <StatCard 
        title="Revenue" 
        value={`$${stats.revenue.toLocaleString()}`} 
        trend="+5.4%" 
        trendUp={true} 
      />
    </div>
  );
}

// Client-side component for the card UI
function StatCard({ 
  title, 
  value, 
  trend, 
  trendUp 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  trendUp: boolean;
}) {
  return (
    <div className="card-custom p-4">
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-fluid-2 font-bold mb-2">{value}</p>
      <div className={`text-sm flex items-center ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {trendUp ? (
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        )}
        <span>{trend} from last month</span>
      </div>
    </div>
  );
} 