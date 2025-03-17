import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | ShipFast Boilerplate',
  description: 'Contact us for questions about the ShipFast Boilerplate or custom requirements',
};

export default function ContactPage() {
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
              
              <div className="card bg-base-100 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="card-body">
                  <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                    Have questions about our licenses, need custom features, or want to discuss enterprise options? We're here to help!
                  </p>
                  
                  <form className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Name</span>
                      </label>
                      <input 
                        type="text" 
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
                        placeholder="john@example.com" 
                        className="input input-bordered" 
                        required 
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Subject</span>
                      </label>
                      <select className="select select-bordered w-full" defaultValue="">
                        <option value="" disabled>Select a subject</option>
                        <option value="license">License Question</option>
                        <option value="support">Technical Support</option>
                        <option value="custom">Custom Development</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Message</span>
                      </label>
                      <textarea 
                        className="textarea textarea-bordered h-32" 
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="form-control mt-6">
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-center">Other Ways to Connect</h2>
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                    <div className="card-body">
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        support@shipfast-boilerplate.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                    <div className="card-body">
                      <h3 className="font-semibold mb-2">GitHub</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <a 
                          href="https://github.com/fyras22/shipfast-boilerplate-" 
                          className="text-primary-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @fyras22/shipfast-boilerplate-
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="card bg-base-100 shadow border border-gray-100 dark:border-gray-800">
                    <div className="card-body">
                      <h3 className="font-semibold mb-2">Response Time</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        We respond to all inquiries within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Looking to purchase a license?
                </p>
                <Link href="/pricing" className="btn btn-outline">
                  View Pricing Plans
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 