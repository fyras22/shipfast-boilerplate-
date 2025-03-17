import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createHash } from 'crypto';

// Schema for validating download requests
const downloadRequestSchema = z.object({
  licenseKey: z.string().min(16, 'License key is required')
});

// Define license types
interface License {
  id: string;
  planId: string;
  planName: string;
  email: string;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
  downloadCount: number;
  maxDownloads: number;
  lastDownload: string;
}

type ValidationResult = 
  | { isValid: false; error: string; license?: undefined }
  | { isValid: true; license: License; error?: undefined };

// Mock database of licenses (in a real app, this would be in a database)
const mockLicenseDb: Record<string, License> = {
  'SHIP-PROF-1234-5678-9ABC': {
    id: 'lic_123456',
    planId: 'professional',
    planName: 'Professional',
    email: 'customer@example.com',
    purchaseDate: '2023-12-15',
    expiryDate: '2024-12-15',
    isActive: true,
    downloadCount: 3,
    maxDownloads: 999, // unlimited for professional
    lastDownload: '2024-01-20',
  },
  'SHIP-PERS-9876-5432-DCBA': {
    id: 'lic_789012',
    planId: 'personal',
    planName: 'Personal',
    email: 'user@example.com',
    purchaseDate: '2023-10-05',
    expiryDate: '2024-04-05',
    isActive: true,
    downloadCount: 1,
    maxDownloads: 5, // limited for personal
    lastDownload: '2023-10-05',
  }
};

// Mock function to validate and retrieve license
async function validateLicense(licenseKey: string): Promise<ValidationResult> {
  // In a real app, this would query a database
  const license = mockLicenseDb[licenseKey];
  
  if (!license) {
    return { isValid: false, error: 'License key not found' };
  }
  
  const today = new Date();
  const expiryDate = new Date(license.expiryDate);
  
  if (today > expiryDate) {
    return { isValid: false, error: 'License has expired' };
  }
  
  if (license.downloadCount >= license.maxDownloads) {
    return { isValid: false, error: 'Maximum download count reached' };
  }
  
  return { 
    isValid: true, 
    license: {
      ...license,
      // Increment download count (in a real app, update the database)
      downloadCount: license.downloadCount + 1,
      lastDownload: new Date().toISOString().split('T')[0]
    }
  };
}

// Function to get the appropriate version based on license tier
function getVersionForLicense(license: License) {
  const versions = {
    personal: 'shipfast-boilerplate-personal-v1.2.0',
    professional: 'shipfast-boilerplate-professional-v1.2.0',
    enterprise: 'shipfast-boilerplate-enterprise-v1.2.0',
  };
  
  return versions[license.planId as keyof typeof versions] || versions.personal;
}

// Generate a secure download URL with expiration
function generateSecureDownloadUrl(license: License, version: string) {
  // In a real app, this would generate a signed URL with expiration
  // For example, using AWS S3 pre-signed URLs or Firebase Storage download tokens
  
  const timestamp = Date.now();
  const expiresIn = 15 * 60 * 1000; // 15 minutes
  const expiryTime = timestamp + expiresIn;
  
  // Create a signature (simplified for demo)
  const signature = createHash('sha256')
    .update(`${license.id}:${expiryTime}:${process.env.DOWNLOAD_SECRET || 'demo_secret'}`)
    .digest('hex');
  
  return `/downloads/${version}.zip?token=${signature}&expires=${expiryTime}`;
}

// Record download activity
async function recordDownloadActivity(license: License, ip: string, userAgent: string) {
  // In a real app, this would:
  // 1. Update the license record with new download count
  // 2. Log the download activity with IP, userAgent, etc.
  // 3. Send notification if suspicious activity is detected
  
  console.log(`Download recorded for license ${license.id} from IP ${ip}`);
  
  // For demo purposes, just return success
  return true;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const licenseKey = searchParams.get('licenseKey');
    
    // Get IP and User Agent for logging
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Validate request parameters
    const result = downloadRequestSchema.safeParse({ licenseKey });
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Validate the license
    const validationResult = await validateLicense(licenseKey as string);
    
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: 'License validation failed', message: validationResult.error },
        { status: 403 }
      );
    }
    
    // If we got here, we know license exists and is valid
    const license = validationResult.license;
    
    // Get the appropriate version for this license
    const version = getVersionForLicense(license);
    
    // Generate a secure download URL
    const downloadUrl = generateSecureDownloadUrl(license, version);
    
    // Record the download activity
    await recordDownloadActivity(license, ip as string, userAgent as string);
    
    // Return success with download information
    return NextResponse.json({
      success: true,
      downloadUrl,
      expiresIn: '15 minutes',
      filename: `${version}.zip`,
      license: {
        planName: license.planName,
        downloadCount: license.downloadCount,
        expiryDate: license.expiryDate
      }
    });
    
  } catch (error) {
    console.error('Download error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 