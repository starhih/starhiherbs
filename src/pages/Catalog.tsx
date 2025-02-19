
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  certifications: string[];
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Ashwagandha Extract",
    category: "Standardized Herbal Extracts",
    description: "Premium quality Ashwagandha (Withania somnifera) root extract standardized to 5% withanolides.",
    certifications: ["Organic", "GMP", "Kosher"],
  },
  {
    id: 2,
    name: "Turmeric Extract",
    category: "Standardized Herbal Extracts",
    description: "High-potency Turmeric (Curcuma longa) root extract standardized to 95% curcuminoids.",
    certifications: ["GMP", "Halal"],
  },
  {
    id: 3,
    name: "Organic Ginger",
    category: "Organic Herbal Extracts",
    description: "Pure organic ginger (Zingiber officinale) root extract with natural bioactives.",
    certifications: ["Organic", "GMP"],
  },
  {
    id: 4,
    name: "Probiotic Blend",
    category: "Probiotics",
    description: "Multi-strain probiotic blend with guaranteed CFU count.",
    certifications: ["GMP", "Vegan"],
  },
];

const CATEGORIES = ["All", "Standardized Herbal Extracts", "Organic Herbal Extracts", "Branded Ingredients", "Probiotics"];

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Catalog</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our comprehensive range of premium herbal extracts, probiotics, and branded ingredients.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <div className="sticky top-16 bg-white border-b z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-primary mb-3">{product.category}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Learn More
                </Button>
                <Button size="sm" className="flex-1">
                  Request Sample
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
