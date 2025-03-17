import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Skeleton cards */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card-custom p-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/3"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
} 