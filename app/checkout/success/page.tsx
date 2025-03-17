import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import LicenseKeyDisplay from '@/app/components/LicenseKeyDisplay';

export const metadata: Metadata = {
  title: 'Order Confirmation | ShipFast Boilerplate',
  description: 'Thank you for your purchase of the ShipFast Boilerplate.',
};

// Mock function to simulate fetching order details
function getOrderDetails() {
  // In a real app, this would fetch from a database based on order ID from the URL
  return {
    id: 'ord_' + Math.random().toString(36).substring(2, 10),
    planId: 'professional',
    planName: 'Professional License',
    amount: 149,
    currency: 'USD',
    email: 'customer@example.com',
    date: new Date().toISOString(),
    paymentMethod: 'card',
    licenseKey: 'SHIPPROFESSIONAL12345678',
    purchaseDate: new Date().toISOString(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  };
}

function PurchaseSuccessContent() {
  const order = getOrderDetails();
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Purchase!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your order has been successfully processed.
        </p>
      </div>
      
      <LicenseKeyDisplay 
        licenseKey={order.licenseKey}
        planName={order.planName}
        purchaseDate={order.purchaseDate}
        expiryDate={order.expiryDate}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Order ID</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Product</span>
            <span className="font-medium">ShipFast Boilerplate - {order.planName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Amount</span>
            <span className="font-medium">${order.amount.toFixed(2)} {order.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Date</span>
            <span className="font-medium">{new Date(order.date).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
            <span className="font-medium capitalize">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Email</span>
            <span className="font-medium">{order.email}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          A receipt has been sent to your email address. You can also access your license and
          downloads from your dashboard at any time.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<div>Loading order details...</div>}>
        <PurchaseSuccessContent />
      </Suspense>
    </main>
  );
} 