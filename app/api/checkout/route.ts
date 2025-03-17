import { NextResponse } from 'next/server';
import { z } from 'zod';

// Purchase schema validation
const purchaseSchema = z.object({
  planId: z.enum(['personal', 'professional', 'enterprise']),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  paymentMethod: z.enum(['card', 'paypal']),
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate the data
    const result = purchaseSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { planId, fullName, email, companyName, paymentMethod } = result.data;
    
    // Mock pricing information
    const prices = {
      personal: 49,
      professional: 149,
      enterprise: 499,
    };
    
    // In a real implementation, you would:
    // 1. Create a payment intent with Stripe/PayPal
    // 2. Save the purchase details to a database
    // 3. Send confirmation emails
    // 4. Generate license keys or access credentials
    
    // For demo purposes, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: 'Purchase processed successfully',
      orderDetails: {
        orderId: `ORD-${Date.now()}`,
        planId,
        amount: prices[planId],
        currency: 'USD',
        paymentMethod,
        customerName: fullName,
        customerEmail: email,
        companyName: companyName || 'N/A',
        purchaseDate: new Date().toISOString(),
      },
      // In a real implementation, this would contain download links, license keys, etc.
      nextSteps: {
        downloadUrl: '/api/download?orderId=mock',
        licenseKey: 'XXXX-XXXX-XXXX-XXXX',
        supportEmail: 'support@shipfast-boilerplate.com',
      },
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 