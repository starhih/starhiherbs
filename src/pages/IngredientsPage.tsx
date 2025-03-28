import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import IngredientFilters, { CATEGORY_INFO } from "@/components/IngredientFilters";
import { products } from "@/data/products";

const IngredientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <h1 className="text-4xl font-bold mb-4">Ingredient Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover our comprehensive range of premium ingredients tailored for your specific needs.
            </p>
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
              placeholder="Search ingredients by name, description, or benefits..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(CATEGORY_INFO).map(([key, category]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2 mb-6">
                {category.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to={`/ingredients/${key}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm">
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">All Products</h2>
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
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
