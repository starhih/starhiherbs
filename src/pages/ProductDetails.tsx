
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Microscope, Shield, Leaf } from "lucide-react";

const MOCK_PRODUCT = {
  id: 1,
  name: "Ashwagandha Extract",
  category: "Standardized Herbal Extracts",
  description: "Premium quality Ashwagandha (Withania somnifera) root extract standardized to 5% withanolides.",
  certifications: ["Organic", "GMP", "Kosher"],
  benefits: [
    "Supports stress management",
    "Promotes healthy sleep patterns",
    "Enhances mental clarity",
  ],
  specifications: {
    standardization: "5% Withanolides",
    form: "Fine powder",
    appearance: "Light brown to brown powder",
    packaging: "25kg drums with double food-grade liner",
  },
};

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6">{MOCK_PRODUCT.name}</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-100 rounded-lg h-80 mb-4 flex items-center justify-center">
                  <Leaf className="w-32 h-32 text-primary" />
                </div>
                <div className="flex gap-2 mb-6">
                  {MOCK_PRODUCT.certifications.map((cert) => (
                    <span key={cert} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-6">{MOCK_PRODUCT.description}</p>
                
                <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
                <ul className="space-y-2 mb-6">
                  {MOCK_PRODUCT.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(MOCK_PRODUCT.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-600 mb-1">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button size="lg">Request Sample</Button>
                  <Button size="lg" variant="outline">Download COA</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
