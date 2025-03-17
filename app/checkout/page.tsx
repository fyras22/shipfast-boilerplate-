import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'Checkout | ShipFast Boilerplate',
  description: 'Complete your purchase of the ShipFast Boilerplate',
};

// Helper function to get plan details
function getPlanDetails(planId: string) {
  const plans = {
    personal: {
      name: 'Personal',
      price: 49,
      features: [
        'Single project use',
        '6 months of updates',
        'Community support',
        'Full source code',
      ],
    },
    professional: {
      name: 'Professional',
      price: 149,
      features: [
        'Unlimited projects',
        '1 year of updates',
        'Priority email support',
        'Full source code',
        'Private GitHub access',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      price: 499,
      features: [
        'Unlimited projects',
        'Lifetime updates',
        'Premium support',
        'Full source code',
        'Private GitHub access',
        'Custom branding options',
      ],
    },
  };
  
  return plans[planId as keyof typeof plans] || plans.personal;
}

// Client component for the checkout form
function CheckoutForm({ planId }: { planId: string }) {
  'use client';
  
  const plan = getPlanDetails(planId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const formValues = {
      planId,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      companyName: formData.get('companyName') as string || undefined,
      paymentMethod: formData.get('paymentMethod') as 'card' | 'paypal',
    };
    
    try {
      // In a real implementation, this would process payment and generate a license
      // For demo purposes, we'll just redirect to the success page
      
      // Optional: Submit to the API
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formValues),
      // });
      
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || 'Failed to process payment');
      // }
      
      // Redirect to success page
      router.push('/checkout/success');
    } catch (error) {
      console.error('Checkout error:', error);
      setFormError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card bg-base-100 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Your Information</h2>
          
          {formError && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{formError}</span>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input 
                type="text" 
                name="fullName"
                placeholder="John Doe" 
                className="input input-bordered" 
                required 
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input 
                type="email" 
                name="email"
                placeholder="john@example.com" 
                className="input input-bordered" 
                required 
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name (Optional)</span>
              </label>
              <input 
                type="text" 
                name="companyName"
                placeholder="Acme Inc." 
                className="input input-bordered" 
              />
            </div>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Payment Information</h3>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-4">
              <p className="text-sm">
                This is a demo checkout page. In a real implementation, you would integrate with:
              </p>
              <ul className="text-sm list-disc list-inside mt-2">
                <li>Stripe for payment processing</li>
                <li>SendOwl or Gumroad for digital product delivery</li>
                <li>Email service for license delivery</li>
              </ul>
            </div>
            
            {/* Payment method selection */}
            <div className="space-y-2">
              <div className="flex items-center p-3 border rounded-lg">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  id="card" 
                  value="card"
                  className="radio" 
                  defaultChecked 
                />
                <label htmlFor="card" className="ml-2 flex-grow">Credit/Debit Card</label>
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-blue-600 rounded"></div>
                  <div className="w-8 h-5 bg-red-500 rounded"></div>
                  <div className="w-8 h-5 bg-gray-300 rounded"></div>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  id="paypal" 
                  value="paypal"
                  className="radio" 
                />
                <label htmlFor="paypal" className="ml-2 flex-grow">PayPal</label>
                <div className="w-8 h-5 bg-blue-800 rounded"></div>
              </div>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : (
                  'Complete Purchase'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div>
        <div className="card bg-base-100 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">{plan.name} License</h2>
            <div className="my-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-gray-500 ml-1">/ one-time</span>
            </div>
            
            <div className="divider"></div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Included in this license:</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="divider"></div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Need a different plan? Go back to pricing
              </p>
              <Link href="/pricing" className="btn btn-outline btn-sm">
                View All Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback
function CheckoutLoading() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  );
}

// Main checkout page component
export default function CheckoutPage({ 
  searchParams 
}: { 
  searchParams: { plan?: string } 
}) {
  const plan = searchParams.plan || 'personal';
  
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        <section className="py-12">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>
            
            <Suspense fallback={<CheckoutLoading />}>
              <CheckoutForm planId={plan} />
            </Suspense>
            
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
              <p>By completing your purchase, you agree to our <Link href="/terms" className="text-primary-500 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 