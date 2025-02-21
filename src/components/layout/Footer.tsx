import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Events", path: "/events" },
    ],
    products: [
      { label: "Catalog", path: "/catalog" },
      { label: "Ingredients Solution", path: "/ingredients" },
      { label: "Applications", path: "/applications" },
    ],
    resources: [
      { label: "Tools", path: "/tools" },
      { label: "Blog", path: "/blog" },
      { label: "Resources Hub", path: "/resources" },
    ],
    tools: [
      { label: "Compatibility Checker", path: "/tools/compatibility-checker" },
      { label: "Dosage Calculator", path: "/tools/dosage-calculator" },
      { label: "COA Validator", path: "/tools/coa-validator" },
      { label: "Cost Estimator", path: "/tools/cost-estimator" },
    ],
    account: [
      { label: "Sign In", path: "/auth/login" },
      { label: "Create Account", path: "/auth/register" },
      { label: "Request Quote", path: "/forms/quote-calculator" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/legal/privacy-policy" },
      { label: "Terms of Service", path: "/legal/terms-of-service" },
      { label: "Cookie Policy", path: "/legal/cookie-policy" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex flex-col items-start gap-4 mb-6">
              <img 
                src="/logo.png" 
                alt="Star Hi Herbs" 
                className="h-16 w-auto brightness-0 invert" 
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Star Hi Herbs</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400">
              Premium quality botanical ingredients for the nutraceutical industry, backed by science and innovation.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Star Hi Herbs. All rights reserved.
            </p>
            <ul className="flex space-x-6 mt-4 md:mt-0">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 