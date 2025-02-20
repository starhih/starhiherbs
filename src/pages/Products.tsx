import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Star, Shield, Award, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.scientificName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            <Star className="w-4 h-4" />
            Premium Quality
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Catalog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of premium herbal extracts, probiotics, and branded ingredients.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products by name, description, or benefits..."
              className="pl-10 h-11 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              className="whitespace-nowrap"
            >
              All Products
            </Button>
            <Button
              variant={selectedCategory === "Standardized Herbal Extract" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Standardized Herbal Extract")}
              className="whitespace-nowrap"
            >
              Standardized Extracts
            </Button>
            <Button
              variant={selectedCategory === "Organic Herbal Extract" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Organic Herbal Extract")}
              className="whitespace-nowrap"
            >
              Organic Extracts
            </Button>
            <Button
              variant={selectedCategory === "Branded Ingredients" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Branded Ingredients")}
              className="whitespace-nowrap"
            >
              Branded Ingredients
            </Button>
            <Button
              variant={selectedCategory === "Probiotics" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Probiotics")}
              className="whitespace-nowrap"
            >
              Probiotics
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  {product.scientificName && (
                    <p className="text-sm text-gray-500 italic mb-2">{product.scientificName}</p>
                  )}
                  <p className="text-sm text-primary mb-3">{product.category}</p>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>
                
                <div className="space-y-4 mt-auto">
                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.slice(0, 3).map((benefit) => (
                      <span
                        key={benefit}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                      >
                        <Shield className="w-3 h-3" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                  
                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-primary/10 rounded-full text-primary"
                      >
                        <Award className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => navigate(`/forms/sample-request?product=${product.name}`)}
                    >
                      Request Sample
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 