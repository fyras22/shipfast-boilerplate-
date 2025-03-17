import Link from 'next/link';

export const metadata = {
  title: 'Order Confirmation | ShipFast Boilerplate',
  description: 'Your ShipFast Boilerplate purchase has been confirmed',
};

export default function SuccessPage() {
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        <section className="py-12">
          <div className="container-custom max-w-3xl">
            <div className="card bg-base-100 shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="card-body">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-green-100 p-4">
                    <svg 
                      className="w-10 h-10 text-green-500" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-center mb-4">Thank You for Your Purchase!</h1>
                
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                  Your order has been successfully processed. You should receive an email with your order details shortly.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Order ID:</span>
                      <span className="font-medium">ORD-1234567890</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">License:</span>
                      <span className="font-medium">Professional License</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                      <span className="font-medium">$149.00 USD</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                  
                  <ol className="space-y-4 list-decimal list-inside">
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Check your email</span> - We've sent your receipt and license details to your provided email address.
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Download the boilerplate</span> - Use the link in your email to download the ShipFast Boilerplate.
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Access the private repository</span> - You'll receive an invitation to the private GitHub repository where you can access updates.
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Read the documentation</span> - Refer to the documentation to get started with your new boilerplate.
                    </li>
                  </ol>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    If you don't receive your email within 15 minutes, please check your spam folder or contact our support team.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn btn-primary">
                      Return to Home
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 