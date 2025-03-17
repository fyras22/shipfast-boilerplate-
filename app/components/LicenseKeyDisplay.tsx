'use client';

import React, { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

interface LicenseKeyDisplayProps {
  licenseKey: string;
  planName: string;
  purchaseDate: string;
  expiryDate: string;
}

export default function LicenseKeyDisplay({
  licenseKey,
  planName,
  purchaseDate,
  expiryDate
}: LicenseKeyDisplayProps) {
  const [copied, setCopied] = useState(false);

  // Format license key for display (add dashes for readability)
  const formatLicenseKey = (key: string) => {
    if (!key) return '';
    return key.match(/.{1,4}/g)?.join('-') || key;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(licenseKey)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy license key:', err);
      });
  };

  // Calculate days until expiry
  const calculateDaysRemaining = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">License Details</h3>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {planName}
        </span>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your License Key</p>
          <div className="flex items-center">
            <code className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono overflow-x-auto">
              {formatLicenseKey(licenseKey)}
            </code>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label="Copy license key"
            >
              {copied ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <CopyIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-500 mt-1">Copied to clipboard!</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Purchase Date</p>
            <p className="font-medium">{new Date(purchaseDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expiry Date</p>
            <div className="flex items-center">
              <p className="font-medium">{new Date(expiryDate).toLocaleDateString()}</p>
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                {daysRemaining} days left
              </span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm">
            You can now download the ShipFast boilerplate from your {' '}
            <a 
              href="/dashboard" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              dashboard
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
} 