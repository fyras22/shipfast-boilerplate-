'use client';

import React, { useState } from 'react';
import { ArrowDown, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface DownloadCardProps {
  licenseKey: string;
  versionInfo: {
    version: string;
    releaseDate: string;
    isLatest: boolean;
    size: string;
    changelog: string[];
  };
}

export default function DownloadCard({ licenseKey, versionInfo }: DownloadCardProps) {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    setDownloadStatus('loading');
    setErrorMessage('');
    
    try {
      // In a real app, this would call your API
      const response = await fetch(`/api/download?licenseKey=${encodeURIComponent(licenseKey)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate download link');
      }
      
      // Download succeeded, now trigger the actual download
      setDownloadStatus('success');
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.setAttribute('download', data.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset status after a delay
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            ShipFast v{versionInfo.version}
            {versionInfo.isLatest && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Latest
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Released on {new Date(versionInfo.releaseDate).toLocaleDateString()}
          </p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{versionInfo.size}</span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">What's new:</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          {versionInfo.changelog.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4">
        <button
          onClick={handleDownload}
          disabled={downloadStatus === 'loading'}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${
            downloadStatus === 'error' 
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              : downloadStatus === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {downloadStatus === 'idle' && (
            <>
              <ArrowDown className="w-4 h-4 mr-2" />
              Download
            </>
          )}
          {downloadStatus === 'loading' && (
            <>
              <Clock className="w-4 h-4 mr-2 animate-pulse" />
              Preparing download...
            </>
          )}
          {downloadStatus === 'success' && (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Download started!
            </>
          )}
          {downloadStatus === 'error' && (
            <>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Download failed
            </>
          )}
        </button>
        
        {downloadStatus === 'error' && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errorMessage || 'Failed to generate download. Please try again or contact support.'}
          </p>
        )}
        
        {downloadStatus === 'success' && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            If your download doesn't start automatically, 
            <button 
              className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              onClick={handleDownload}
            >
              click here
            </button>.
          </p>
        )}
      </div>
    </div>
  );
} 