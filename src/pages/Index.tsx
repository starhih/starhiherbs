
import { Button } from "@/components/ui/button";
import { Flask, Leaf, Factory, Shield, Microscope, Vial } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white z-0" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-up">
              Pure, Potent & Science-Backed Herbal Extracts
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Empowering supplement manufacturers & private label brands with premium botanical ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8">
                Request a Sample
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Star Hi Herbs?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Flask,
                title: "Scientific Innovation",
                description: "State-of-the-art research and development for optimal efficacy",
              },
              {
                icon: Leaf,
                title: "Pure & Sustainable Sourcing",
                description: "Ethically sourced ingredients with complete traceability",
              },
              {
                icon: Factory,
                title: "Manufacturing Excellence",
                description: "GMP-certified facilities with rigorous quality control",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-white rounded-xl border hover:border-primary transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Product Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Microscope,
                title: "Standardized Herbal Extracts",
                description: "Scientifically validated active compounds",
              },
              {
                icon: Leaf,
                title: "Organic Herbal Extracts",
                description: "Certified organic botanical ingredients",
              },
              {
                icon: Shield,
                title: "Branded Ingredients",
                description: "Proprietary formulations with proven efficacy",
              },
              {
                icon: Vial,
                title: "Probiotics",
                description: "Clinically studied beneficial strains",
              },
            ].map((category, index) => (
              <div
                key={category.title}
                className="group bg-white p-6 rounded-xl border hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <category.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Basic version) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Star Hi Herbs</h3>
              <p className="text-gray-400">
                Premium botanical ingredients for the nutraceutical industry.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-gray-400 hover:text-white transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/documentation" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Get in touch for premium herbal extracts and probiotics.
              </p>
              <Button
                className="mt-4 bg-primary hover:bg-primary-dark text-white"
                size="sm"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
