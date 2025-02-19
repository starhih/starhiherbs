
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Search, Microscope, Shield, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";

const ResourcesHub = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Resources Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Access our comprehensive collection of technical documentation, research papers, and industry insights.
          </p>
          <div className="max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search resources..." className="pl-10" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Microscope,
                title: "Technical Documentation",
                description: "Access detailed product specifications, safety data sheets, and regulatory documentation.",
              },
              {
                icon: Shield,
                title: "Quality Certifications",
                description: "View our quality certifications, including GMP, ISO, and organic certifications.",
              },
              {
                icon: Leaf,
                title: "Research Papers",
                description: "Explore scientific research and clinical studies supporting our ingredients.",
              },
              // Add more resource categories
            ].map((resource) => (
              <div key={resource.title} className="bg-white rounded-lg shadow-sm p-6">
                <resource.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Button variant="outline">View Resources</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesHub;
