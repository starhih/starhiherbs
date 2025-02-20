import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search,
  FileDown,
  FileText,
  Download,
  Filter,
  BookOpen,
  FileCheck,
  TestTube,
  Award,
  ArrowRight,
  Video
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  fileSize: string;
  downloadUrl: string;
  date: string;
};

const CATEGORIES = [
  { id: "all", name: "All Resources" },
  { id: "technical", name: "Technical Documents" },
  { id: "research", name: "Research Papers" },
  { id: "quality", name: "Quality Certificates" },
  { id: "product", name: "Product Specifications" },
  { id: "white-papers", name: "White Papers" },
];

const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Standardization Methods in Herbal Extract Manufacturing",
    description: "Comprehensive guide to standardization techniques and best practices in herbal extract production.",
    category: "technical",
    type: "PDF",
    fileSize: "2.4 MB",
    downloadUrl: "/resources/standardization-guide.pdf",
    date: "2024-03-19"
  },
  {
    id: "2",
    title: "Quality Control in Botanical Processing",
    description: "White paper on implementing effective quality control measures in botanical processing facilities.",
    category: "white-papers",
    type: "PDF",
    fileSize: "1.8 MB",
    downloadUrl: "/resources/quality-control-white-paper.pdf",
    date: "2024-03-18"
  },
  {
    id: "3",
    title: "Ashwagandha Extract Technical Specifications",
    description: "Detailed technical specifications for our standardized Ashwagandha extract.",
    category: "product",
    type: "PDF",
    fileSize: "1.2 MB",
    downloadUrl: "/resources/ashwagandha-specs.pdf",
    date: "2024-03-17"
  },
  {
    id: "4",
    title: "ISO 9001:2015 Certificate",
    description: "Our ISO 9001:2015 Quality Management System certification.",
    category: "quality",
    type: "PDF",
    fileSize: "856 KB",
    downloadUrl: "/resources/iso-certificate.pdf",
    date: "2024-03-16"
  },
  {
    id: "5",
    title: "Bioactive Compounds in Herbal Extracts",
    description: "Research paper on identification and quantification of bioactive compounds in herbal extracts.",
    category: "research",
    type: "PDF",
    fileSize: "3.2 MB",
    downloadUrl: "/resources/bioactive-compounds-research.pdf",
    date: "2024-03-15"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "technical":
      return FileText;
    case "research":
      return TestTube;
    case "quality":
      return Award;
    case "product":
      return FileCheck;
    case "white-papers":
      return BookOpen;
    default:
      return FileText;
  }
};

const ResourcesHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resource: Resource) => {
    // In a real application, this would handle the actual file download
    // For now, we'll just log the action
    console.log(`Downloading: ${resource.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileDown className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Resources Hub
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access our comprehensive collection of technical documents, research papers, 
              quality certificates, and product specifications.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem 
                        key={category.id} 
                        value={category.id}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map((resource, index) => {
              const Icon = getCategoryIcon(resource.category);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-200">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          "bg-primary/10 text-primary"
                        )}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/5 text-primary">
                          {CATEGORIES.find(c => c.id === resource.category)?.name}
                        </Badge>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          {resource.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {resource.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{resource.type}</span>
                          <span>{resource.fileSize}</span>
                          <span>{resource.date}</span>
                        </div>
                        <Button
                          onClick={() => handleDownload(resource)}
                          variant="outline"
                          className="gap-2 text-primary hover:text-primary-dark hover:bg-primary/5"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No resources found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResourcesHub;
