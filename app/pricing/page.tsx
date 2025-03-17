import Link from 'next/link';

export const metadata = {
  title: 'Pricing | ShipFast Boilerplate',
  description: 'Premium Next.js 14 boilerplate with advanced features for rapid development',
};

function CheckIcon() {
  return (
    <svg 
      className="w-5 h-5 text-green-500" 
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
  );
}

export default function PricingPage() {
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-950 py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-fluid-4 font-bold leading-tight tracking-tighter mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-fluid-1 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the perfect license for your project and start building right away
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-800">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">Personal</h2>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-gray-500 ml-1">/ one-time</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Perfect for individual developers or small personal projects.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Single project use</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">6 months of updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Community support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Full source code</span>
                    </li>
                  </ul>
                  <div className="card-actions justify-center mt-auto">
                    <Link href="/checkout?plan=personal" className="btn btn-outline btn-block">
                      Buy Personal License
                    </Link>
                  </div>
                </div>
              </div>

              {/* Professional Plan - Highlighted */}
              <div className="card bg-primary-50 dark:bg-primary-900/20 shadow-xl hover:shadow-2xl transition-shadow border-2 border-primary-500 relative">
                <div className="absolute top-0 right-0 bg-primary-500 text-white py-1 px-4 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">Professional</h2>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">$149</span>
                    <span className="text-gray-500 ml-1">/ one-time</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Ideal for professional developers and small businesses.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Unlimited projects</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">1 year of updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Priority email support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Full source code</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Private GitHub access</span>
                    </li>
                  </ul>
                  <div className="card-actions justify-center mt-auto">
                    <Link href="/checkout?plan=professional" className="btn btn-primary btn-block">
                      Buy Professional License
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-800">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">Enterprise</h2>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">$499</span>
                    <span className="text-gray-500 ml-1">/ one-time</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Complete solution for agencies and large organizations.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Unlimited projects</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Lifetime updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Premium support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Full source code</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Private GitHub access</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon />
                      <span className="ml-2">Custom branding options</span>
                    </li>
                  </ul>
                  <div className="card-actions justify-center mt-auto">
                    <Link href="/checkout?plan=enterprise" className="btn btn-outline btn-block">
                      Buy Enterprise License
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">What's included in the license?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Each license includes the complete source code, documentation, and entitles you to updates as specified in your plan. You can use the boilerplate to build applications according to your license terms.
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">Can I use this for client projects?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes, the Professional and Enterprise licenses allow you to use the boilerplate for client projects. The Personal license is limited to a single project for personal use only.
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">Do I need to attribute ShipFast?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      No, you don't need to attribute ShipFast in your projects. You're free to remove any references to ShipFast in the final product.
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">How do I receive updates?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      You'll get access to a private GitHub repository where all updates are published. You'll receive notifications when new updates are available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold mb-4">Have more questions?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                If you have any questions about licensing or need custom arrangements, please don't hesitate to contact us.
              </p>
              <Link href="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 