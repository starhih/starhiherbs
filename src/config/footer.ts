export const footerLinks = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Careers", path: "/careers" },
    { label: "Events", path: "/events" }
  ],
  products: [
    { label: "All Products", path: "/products" },
    { label: "Raw Materials", path: "/products/raw-materials" },
    { label: "Extracts", path: "/products/extracts" },
    { label: "Powders", path: "/products/powders" }
  ],
  resources: [
    { label: "Blog", path: "/blog" },
    { label: "Documentation", path: "/docs" },
    { label: "FAQs", path: "/faqs" },
    { label: "Support", path: "/support" }
  ],
  tools: [
    { label: "Quote Calculator", path: "/forms/quote-calculator" },
    { label: "Compatibility Checker", path: "/tools/compatibility-checker" },
    { label: "Dosage Calculator", path: "/tools/dosage-calculator" },
    { label: "COA Validator", path: "/tools/coa-validator" },
    { label: "Cost Estimator", path: "/tools/cost-estimator" }
  ],
  account: [
    { label: "Sign In", path: "/auth/login" },
    { label: "Register", path: "/auth/register" }
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" }
  ]
} as const; 