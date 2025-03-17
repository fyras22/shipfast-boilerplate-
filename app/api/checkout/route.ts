import { NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';

// Initialize Stripe (in a real app, you'd use an environment variable)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_demo', {
  apiVersion: '2023-10-16',
});

// Purchase schema validation
const purchaseSchema = z.object({
  planId: z.enum(['personal', 'professional', 'enterprise']),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  paymentMethod: z.enum(['card', 'paypal']),
  discountCode: z.string().optional(),
  discountAmount: z.number().optional(),
  finalPrice: z.number()
});

// License key generator (simplified for demo purposes)
function generateLicenseKey(planId: string, email: string) {
  const prefix = planId === 'personal' 
    ? 'SHIP-PERS' 
    : planId === 'professional' 
      ? 'SHIP-PROF' 
      : 'SHIP-ENTP';
      
  const timestamp = Date.now().toString().slice(-8);
  const emailHash = email.split('@')[0].slice(0, 4).toUpperCase();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${prefix}-${timestamp}-${emailHash}-${random}`;
}

// Discount codes (in a real app, this would be in a database)
const discountCodes = {
  'LAUNCH25': { type: 'percentage', value: 25, isValid: true },
  'SAVE50': { type: 'percentage', value: 50, isValid: true },
  'HOLIDAY10': { type: 'flat', value: 10, isValid: true },
  'WELCOME': { type: 'percentage', value: 15, isValid: true },
};

// Plan details
const plans = {
  personal: {
    name: 'Personal License',
    basePrice: 49,
    features: ['Single project use', '6 months of updates', 'Community support'],
    expiryMonths: 6,
  },
  professional: {
    name: 'Professional License',
    basePrice: 149,
    features: ['Unlimited projects', '1 year of updates', 'Priority email support', 'GitHub access'],
    expiryMonths: 12,
  },
  enterprise: {
    name: 'Enterprise License',
    basePrice: 499,
    features: ['Unlimited projects', 'Lifetime updates', 'Premium support', 'GitHub access', 'Custom branding'],
    expiryMonths: 999, // effectively lifetime
  },
};

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
    
    const { planId, fullName, email, companyName, paymentMethod, discountCode, discountAmount, finalPrice } = result.data;
    
    // Verify discount code if provided
    if (discountCode) {
      const code = discountCodes[discountCode as keyof typeof discountCodes];
      if (!code || !code.isValid) {
        return NextResponse.json(
          { error: 'Invalid discount code' },
          { status: 400 }
        );
      }
      
      // Verify the calculated discount amount matches what we expect
      let expectedDiscountAmount = 0;
      const basePrice = plans[planId].basePrice;
      
      if (code.type === 'percentage') {
        expectedDiscountAmount = Math.round(basePrice * (code.value / 100));
      } else {
        expectedDiscountAmount = code.value;
      }
      
      if (discountAmount !== expectedDiscountAmount) {
        return NextResponse.json(
          { error: 'Discount amount mismatch' },
          { status: 400 }
        );
      }
    }
    
    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalPrice * 100, // Stripe uses cents
      currency: 'usd',
      payment_method_types: ['card'],
      description: `${plans[planId].name} Purchase`,
      metadata: {
        planId,
        customerEmail: email,
        customerName: fullName,
        companyName: companyName || 'N/A',
        discountCode: discountCode || 'None',
      },
    });
    
    // Generate license details
    const licenseKey = generateLicenseKey(planId, email);
    const purchaseDate = new Date().toISOString().split('T')[0];
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + plans[planId].expiryMonths);
    const expiryDateString = expiryDate.toISOString().split('T')[0];
    
    // In a real app, you would:
    // 1. Save the license details to a database
    // 2. Set up a webhook to confirm the payment was completed
    // 3. Send an email with license details and download link
    
    // For demo purposes, we'll skip those steps and return the client secret
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: 'Payment intent created successfully',
      orderDetails: {
        orderId: `ORD-${Date.now()}`,
        planId,
        planName: plans[planId].name,
        amount: finalPrice,
        originalPrice: plans[planId].basePrice,
        discountAmount: discountAmount || 0,
        discountCode: discountCode || 'None',
        currency: 'USD',
        paymentMethod,
        customerName: fullName,
        customerEmail: email,
        companyName: companyName || 'N/A',
        purchaseDate,
        expiryDate: expiryDateString,
      },
      licenseDetails: {
        licenseKey,
        isActive: true,
        downloadUrl: `/api/download?licenseKey=${licenseKey}`,
        githubAccess: planId !== 'personal',
        supportEmail: 'support@shipfast-boilerplate.com',
      },
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Determine if this is a Stripe error
    if (error instanceof Stripe.errors.StripeError) {
      const stripeError = error as Stripe.errors.StripeError;
      
      return NextResponse.json(
        { 
          error: 'Payment processing error', 
          message: stripeError.message,
          code: stripeError.code 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 