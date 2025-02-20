import Navbar from "@/components/layout/Navbar";
import { Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">About Star Hi Herbs</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Leading supplier of premium botanical ingredients for the nutraceutical industry.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2010, Star Hi Herbs has grown to become a trusted partner in the nutraceutical industry. Our commitment to quality, innovation, and sustainability has established us as a leading supplier of premium botanical ingredients.
              </p>
              <p className="text-gray-600 mb-6">
                We combine traditional herbal wisdom with modern scientific methods to deliver ingredients that meet the highest standards of quality and efficacy.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg h-80" />
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality",
                  description: "Unwavering commitment to the highest standards of product quality and safety.",
                },
                {
                  title: "Innovation",
                  description: "Continuous investment in research and development to advance botanical science.",
                },
                {
                  title: "Sustainability",
                  description: "Responsible sourcing and environmental stewardship in all operations.",
                },
              ].map((value) => (
                <div key={value.title} className="bg-white rounded-lg shadow-sm p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
