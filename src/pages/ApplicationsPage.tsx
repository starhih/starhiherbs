
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Microscope, Shield, Leaf } from "lucide-react";

const ApplicationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Applications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Explore the various applications of our premium ingredients across different industries.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {[
            {
              title: "Dietary Supplements",
              description: "Premium ingredients for capsules, tablets, and powders.",
              features: [
                "Standardized herbal extracts",
                "Custom formulation support",
                "Stability testing",
              ],
            },
            {
              title: "Functional Foods",
              description: "Natural ingredients for fortified food products.",
              features: [
                "Clean label solutions",
                "Taste-masked extracts",
                "Heat-stable ingredients",
              ],
            },
            {
              title: "Sports Nutrition",
              description: "Performance-enhancing botanical ingredients.",
              features: [
                "Pre-workout formulas",
                "Recovery blends",
                "Energy support",
              ],
            },
          ].map((application) => (
            <div key={application.title} className="mb-12 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-4">{application.title}</h2>
              <p className="text-gray-600 mb-6">{application.description}</p>
              <div className="grid md:grid-cols-3 gap-6">
                {application.features.map((feature) => (
                  <div key={feature} className="p-4 border rounded-lg">
                    <Shield className="w-8 h-8 text-primary mb-3" />
                    <p className="font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ApplicationsPage;
