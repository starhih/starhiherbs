import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600">
                  By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms, you should not use our website or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Permission is granted to temporarily access the materials on Star Hi Herbs's website</li>
                  <li>This is the grant of a license, not a transfer of title</li>
                  <li>This license shall automatically terminate if you violate any of these restrictions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
                <p className="text-gray-600">
                  We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product offered by Star Hi Herbs is not as described, your sole remedy is to return it in unused condition.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
                <p className="text-gray-600">
                  The materials on Star Hi Herbs's website are provided on an 'as is' basis. Star Hi Herbs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
                <p className="text-gray-600">
                  In no event shall Star Hi Herbs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Star Hi Herbs's website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                <p className="text-gray-600">
                  These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4">
                  <Link to="/contact" className="text-primary hover:underline">
                    Contact Page
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService; 