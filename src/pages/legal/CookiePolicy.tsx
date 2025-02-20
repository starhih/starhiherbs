import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

const CookiePolicy = () => {
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
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600">
                  Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and more useful to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                  <li>Essential cookies: Required for the operation of our website</li>
                  <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                  <li>Preference cookies: Allow our website to remember your preferences</li>
                  <li>Marketing cookies: Track your activity across websites to deliver targeted advertising</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Session Cookies</h3>
                    <p className="text-gray-600">
                      These cookies are temporary and expire once you close your browser.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Persistent Cookies</h3>
                    <p className="text-gray-600">
                      These cookies remain on your device until they expire or you delete them.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Third-Party Cookies</h3>
                    <p className="text-gray-600">
                      These cookies are placed by third-party services that appear on our pages.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Your Cookie Choices</h2>
                <p className="text-gray-600">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy; 