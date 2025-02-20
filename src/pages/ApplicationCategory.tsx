import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ApplicationFilters, { APPLICATION_INFO, APPLICATION_CATEGORIES } from "@/components/ApplicationFilters";
import { products } from "@/data/products";

type ApplicationCategoryId = keyof typeof APPLICATION_CATEGORIES;

const ApplicationCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  if (!categoryId || !(categoryId in APPLICATION_INFO)) {
    return <Navigate to="/applications" replace />;
  }

  const category = APPLICATION_INFO[categoryId as ApplicationCategoryId];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = product.applications.some(
      app => app.toLowerCase() === category.title.toLowerCase()
    );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <section className="pt-24 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mb-6">
              {category.description}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {category.features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-primary/5 rounded-lg p-4 flex items-center gap-3"
                >
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ApplicationFilters />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search products in ${category.title.toLowerCase()}...`}
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              No products found matching your search criteria in {category.title}.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="space-y-2 mb-6">
                  {product.applications.slice(0, 3).map((application, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>{application}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/forms/sample-request?product=${product.name}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm">
                      Request Sample
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCategory; 