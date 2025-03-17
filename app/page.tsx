import Link from 'next/link';

// Simplified icons for the demo
function RocketIcon(props: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className={props.className} 
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    </svg>
  );
}

function ShieldIcon(props: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className={props.className} 
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SparklesIcon(props: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className={props.className} 
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    </svg>
  );
}

function CodeIcon(props: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className={props.className} 
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-950 py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-fluid-5 font-bold leading-tight tracking-tighter mb-4 md:mb-8">
              ShipFast Boilerplate
            </h1>
            <p className="text-fluid-1 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              The ultimate Next.js 14 starter template with App Router, MongoDB, NextAuth, TypeScript, and DaisyUI. 
              Built for performance, security, and rapid development.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link 
                href="#features" 
                className="btn btn-primary btn-lg"
              >
                Get Started
              </Link>
              <Link 
                href="https://github.com/yourusername/shipfast-boilerplate" 
                className="btn btn-outline btn-lg"
              >
                GitHub
              </Link>
            </div>
            
            <div className="relative max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-2">
                <div className="relative h-[350px] md:h-[500px] w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Your Application Screenshot
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-fluid-3 font-bold mb-4">Built for Performance & Developer Experience</h2>
              <p className="text-fluid-1 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Engineered with modern best practices to help you ship faster without compromising quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="card-custom p-6">
                <div className="mb-4 text-primary-500">
                  <RocketIcon className="w-10 h-10" />
                </div>
                <h3 className="text-fluid-1 font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized for speed with server components, code splitting, and image optimization.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card-custom p-6">
                <div className="mb-4 text-primary-500">
                  <ShieldIcon className="w-10 h-10" />
                </div>
                <h3 className="text-fluid-1 font-semibold mb-2">Secure by Default</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Built-in security with NextAuth, middleware protection, and data validation.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card-custom p-6">
                <div className="mb-4 text-primary-500">
                  <SparklesIcon className="w-10 h-10" />
                </div>
                <h3 className="text-fluid-1 font-semibold mb-2">Modern UI</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Beautiful interface with TailwindCSS and DaisyUI with dark mode support.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card-custom p-6">
                <div className="mb-4 text-primary-500">
                  <CodeIcon className="w-10 h-10" />
                </div>
                <h3 className="text-fluid-1 font-semibold mb-2">TypeScript First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Full type safety with TypeScript and Zod schema validation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-50 dark:bg-primary-900/20 py-16">
          <div className="container-custom text-center">
            <h2 className="text-fluid-3 font-bold mb-4">Ready to Ship Faster?</h2>
            <p className="text-fluid-1 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Get started with ShipFast and focus on building your product, not your infrastructure.
            </p>
            <Link href="https://github.com/yourusername/shipfast-boilerplate" className="btn btn-primary btn-lg">
              Star on GitHub
            </Link>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} ShipFast Boilerplate. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                Terms
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                Privacy
              </a>
              <a href="https://github.com/yourusername/shipfast-boilerplate" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 