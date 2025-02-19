
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Microscope, Shield, Leaf } from "lucide-react";

const IngredientsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Ingredient Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Discover our comprehensive range of premium ingredients tailored for your specific needs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Microscope,
                title: "Sports Nutrition",
                description: "Performance-enhancing botanical extracts for athletic supplements.",
                features: ["Pre-workout boosters", "Recovery formulations", "Endurance support"],
              },
              {
                icon: Shield,
                title: "Immune Support",
                description: "Natural ingredients that strengthen immune system function.",
                features: ["Antioxidant blends", "Adaptogenic herbs", "Immune modulators"],
              },
              {
                icon: Leaf,
                title: "Cognitive Health",
                description: "Brain-supporting extracts for mental clarity and focus.",
                features: ["Memory enhancement", "Focus improvement", "Stress management"],
              },
              // Add more categories as needed
            ].map((solution) => (
              <div key={solution.title} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <solution.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IngredientsPage;
