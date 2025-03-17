import React from 'react';

// This would normally fetch data from a database
async function getRecentActivity(userId: string) {
  // Simulate loading time to demonstrate Suspense
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data
  return [
    {
      id: '1',
      type: 'created',
      entity: 'Project',
      name: 'Marketing Campaign',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '2',
      type: 'updated',
      entity: 'Task',
      name: 'Update landing page',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: '3',
      type: 'completed',
      entity: 'Task',
      name: 'Design new logo',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: '4',
      type: 'commented',
      entity: 'Task',
      name: 'Fix navigation bug',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
  ];
}

export async function RecentActivity({ userId }: { userId: string }) {
  const activities = await getRecentActivity(userId);
  
  if (activities.length === 0) {
    return <p className="text-gray-500">No recent activity found.</p>;
  }
  
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  // Format the date to a relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'created':
        return (
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
        );
      case 'updated':
        return (
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
        );
      case 'completed':
        return (
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
            <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
        );
    }
  };
  
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
      {getActivityIcon(activity.type)}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {activity.entity}: {activity.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You {activity.type} this {activity.entity.toLowerCase()}
        </p>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {formatRelativeTime(activity.date)}
      </div>
    </div>
  );
} 