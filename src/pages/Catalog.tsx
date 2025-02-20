import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Star, Shield, Award, Leaf } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { products, PRODUCT_CATEGORIES, type Product } from "@/data/products";

const Catalog = () => {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              <Star className="w-4 h-4" />
              Premium Quality
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Catalog</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover our comprehensive range of premium herbal extracts, probiotics, and branded ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <div className="sticky top-16 bg-white border-b z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products by name, description, or benefits..."
                className="pl-10 h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
                className={cn(
                  "whitespace-nowrap px-4 h-11",
                  selectedCategory === "All" ? "bg-primary text-white hover:bg-primary/90" : "text-gray-700"
                )}
              >
                All Products
              </Button>
              {Object.values(PRODUCT_CATEGORIES).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "whitespace-nowrap px-4 h-11",
                    selectedCategory === category ? "bg-primary text-white hover:bg-primary/90" : "text-gray-700"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
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
                      className="flex-1 h-11"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      className="flex-1 h-11 text-white"
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

      {/* Related Solutions Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Explore Our Solutions</h2>
            <p className="text-gray-600 text-lg">
              Discover comprehensive solutions tailored to your industry needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              to="/ingredients" 
              className="group bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-primary/10"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Ingredient Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                Discover our comprehensive range of premium ingredients.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link 
              to="/applications" 
              className="group bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-primary/10"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Applications
              </h3>
              <p className="text-gray-600 mb-4">
                Explore industry-specific solutions and applications.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
