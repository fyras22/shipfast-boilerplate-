import Link from 'next/link';

export const metadata = {
  title: 'License Terms | ShipFast Boilerplate',
  description: 'License terms and conditions for the ShipFast Boilerplate',
};

export default function TermsPage() {
  return (
    <div className="layout-wrapper">
      <main className="layout-main">
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">Commercial License Terms</h1>
              
              <div className="prose dark:prose-invert max-w-none">
                <h2>ShipFast Boilerplate Commercial License Agreement</h2>
                
                <p>This Commercial License Agreement (the "Agreement") is a legal agreement between you (either an individual or a single entity) and ShipFast ("Licensor") for the ShipFast Boilerplate software product, which includes computer software and associated documentation (the "Software").</p>
                
                <p>By purchasing, downloading, installing, or using the Software, you agree to be bound by the terms of this Agreement. If you do not agree to the terms of this Agreement, do not purchase, download, install, or use the Software.</p>
                
                <h3>1. License Grant</h3>
                
                <p>Depending on the license you purchase, Licensor grants you the following non-exclusive, non-transferable license:</p>
                
                <h4>1.1. Personal License</h4>
                <ul>
                  <li>Use the Software to create a single end product for yourself or for one client.</li>
                  <li>The end product can only be used by you or your client.</li>
                  <li>You cannot use the Software to create products for multiple clients or for distribution or resale.</li>
                </ul>
                
                <h4>1.2. Professional License</h4>
                <ul>
                  <li>Use the Software to create unlimited end products for yourself or for clients.</li>
                  <li>You can use the Software to create products that are distributed or sold.</li>
                  <li>You cannot allow your clients to modify, redistribute, or resell the Software itself.</li>
                </ul>
                
                <h4>1.3. Enterprise License</h4>
                <ul>
                  <li>Use the Software to create unlimited end products for yourself or for clients.</li>
                  <li>You can use the Software to create products that are distributed or sold.</li>
                  <li>You can modify the Software as needed for your projects.</li>
                  <li>You cannot redistribute or resell the Software itself.</li>
                </ul>
                
                <h3>2. License Duration and Updates</h3>
                
                <p>Your license entitles you to:</p>
                
                <ul>
                  <li>Personal License: Six (6) months of updates from the date of purchase.</li>
                  <li>Professional License: One (1) year of updates from the date of purchase.</li>
                  <li>Enterprise License: Lifetime updates.</li>
                </ul>
                
                <p>After the update period expires, you may continue to use the version of the Software you have, but will not receive updates, bug fixes, or new features unless you renew your license.</p>
                
                <h3>3. Restrictions</h3>
                
                <p>You may not:</p>
                
                <ul>
                  <li>Use the Software to create derivative works that are competitive with the Software.</li>
                  <li>Redistribute, sell, lease, license, sublicense, or transfer the Software itself to any third party.</li>
                  <li>Remove or alter any proprietary notices or marks on the Software.</li>
                </ul>
                
                <h3>4. Intellectual Property</h3>
                
                <p>The Software is owned by Licensor and is protected by copyright laws and international treaty provisions. You acknowledge that no title to the intellectual property in the Software is transferred to you. You further acknowledge that title and full ownership rights to the Software will remain the exclusive property of Licensor.</p>
                
                <h3>5. No Attribution Required</h3>
                
                <p>You are not required to give attribution to Licensor when using the Software to create end products. You may remove all references to ShipFast in your projects.</p>
                
                <h3>6. Warranty Disclaimer</h3>
                
                <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
                
                <h3>7. Open Source Components</h3>
                
                <p>The Software may include certain open source components that are subject to open source licenses. A list of these components and their respective licenses will be provided upon request.</p>
                
                <h3>8. Term and Termination</h3>
                
                <p>This Agreement is effective until terminated. Licensor may terminate this Agreement immediately if you breach any of its terms. Upon termination, you must destroy all copies of the Software.</p>
                
                <h3>9. Support</h3>
                
                <p>Support is provided based on your license tier:</p>
                
                <ul>
                  <li>Personal License: Community forum support only.</li>
                  <li>Professional License: Email support with reasonable response times.</li>
                  <li>Enterprise License: Priority email support with faster response times and limited consulting.</li>
                </ul>
                
                <h3>10. Refunds</h3>
                
                <p>Due to the digital nature of the Software, all sales are final and no refunds will be issued unless required by law.</p>
                
                <h3>11. Governing Law</h3>
                
                <p>This Agreement shall be governed by the laws of the jurisdiction in which Licensor operates, without regard to its conflict of law provisions.</p>
                
                <h3>Contact Information</h3>
                
                <p>If you have any questions about this Agreement, please contact us at support@shipfast-boilerplate.com.</p>
                
                <p>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Link href="/pricing" className="btn btn-primary">
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