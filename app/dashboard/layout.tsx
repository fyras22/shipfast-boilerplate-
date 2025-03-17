import { Metadata } from 'next';
import DashboardHeader from '@/app/components/DashboardHeader';

export const metadata: Metadata = {
  title: 'Dashboard | ShipFast Boilerplate',
  description: 'Manage your ShipFast Boilerplate licenses and downloads',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  );
} 