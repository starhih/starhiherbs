import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Microscope, 
  Shield, 
  Leaf, 
  Award, 
  ArrowRight, 
  FileText, 
  Beaker, 
  Target, 
  Package,
  ChevronLeft 
} from "lucide-react";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/catalog')} className="inline-flex items-center">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Return to Catalog
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back to Catalog */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/catalog')}
              className="text-gray-600 hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 md:p-8 lg:p-10"
          >
            {/* Product Header */}
            <div className="mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              {product.scientificName && (
                <p className="text-lg text-gray-600 italic mb-4">{product.scientificName}</p>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl h-80 mb-6 flex items-center justify-center">
                  <Leaf className="w-32 h-32 text-primary" />
                </div>
                
                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.certifications.map((cert) => (
                    <span 
                      key={cert} 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      <Award className="w-4 h-4" />
                      {cert}
                    </span>
                  ))}
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <Button 
                    size="lg"
                    className="w-full sm:flex-1 h-11 sm:h-12 text-white font-medium"
                    onClick={() => navigate(`/forms/sample-request?product=${product.name}`)}
                  >
                    Request Sample
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:flex-1 h-11 sm:h-12 font-medium"
                    onClick={() => navigate(`/forms/quote-calculator?product=${product.name}`)}
                  >
                    Get Quote
                  </Button>
                </div>
              </motion.div>
              
              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-primary" />
                    Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                
                {/* Standardization */}
                {product.standardization && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-primary" />
                      Standardization
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{product.standardization}</p>
                  </div>
                )}
                
                {/* Benefits */}
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Key Benefits
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Applications */}
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Applications
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {product.applications.map((application) => (
                      <li key={application} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {application}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Specifications */}
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Specifications
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <dt className="text-sm text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                        <dd className="font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Documentation */}
                {product.documents && product.documents.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Documentation
                    </h2>
                    <div className="grid gap-3">
                      {product.documents.map((doc) => (
                        <Button
                          key={doc.title}
                          variant="outline"
                          className="justify-start h-auto py-3 hover:bg-gray-50"
                        >
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                            <div className="text-left">
                              <div className="font-medium">{doc.title}</div>
                              <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
