import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import IngredientFilters, { CATEGORY_INFO, INGREDIENT_CATEGORIES } from "@/components/IngredientFilters";
import { products } from "@/data/products";

type IngredientCategoryId = keyof typeof INGREDIENT_CATEGORIES;

const IngredientCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  if (!categoryId || !(categoryId in CATEGORY_INFO)) {
    return <Navigate to="/ingredients" replace />;
  }

  const category = CATEGORY_INFO[categoryId as IngredientCategoryId];

  // Filter products based on category and search query
  const categoryProducts = products.filter((product) => {
    const matchesSearch = 
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));

    // You'll need to implement logic to match products with categories
    // This is a simplified example - adjust based on your product data structure
    const matchesCategory = product.benefits.some(benefit =>
      category.benefits.includes(benefit)
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
            <div className="flex flex-wrap gap-3">
              {category.benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary font-medium"
                >
                  <Shield className="w-4 h-4" />
                  {benefit}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <IngredientFilters />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products in this category..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              {product.scientificName && (
                <p className="text-sm text-gray-500 italic mb-2">{product.scientificName}</p>
              )}
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="space-y-2 mb-6">
                {product.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>{benefit}</span>
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

        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or browse other categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientCategory; 