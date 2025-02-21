import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Download,
  ArrowRight,
  Filter,
  Star,
  BookOpen,
  FileIcon,
  Calendar,
  Clock,
  Eye,
  ThumbsUp
} from "lucide-react";
import { Resource, ResourceCategory, ResourceType } from "@/types/resources";
import { resources } from "@/data/resources";

const ResourcesHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>("all");
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>("all");

  const handleDownload = (resource: Resource) => {
    // Implement download logic here
    window.open(resource.downloadUrl, '_blank');
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
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
            Knowledge Center
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive collection of guides, research papers, and technical documentation.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources by title, description, or content..."
              className="pl-10 h-11 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ResourceCategory | 'all')}>
              <SelectTrigger className="w-[180px] bg-white">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
                <SelectItem value="case-study">Case Studies</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ResourceType | 'all')}>
              <SelectTrigger className="w-[180px] bg-white">
                <FileIcon className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Document</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary capitalize">{resource.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                
                {resource.author && (
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={resource.author.avatar}
                      alt={resource.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{resource.author.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-auto mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <FileText className="w-4 h-4 mr-2 text-primary" />
                  <span className="capitalize">{resource.type} • {resource.fileSize}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span>Updated {new Date(resource.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span>{resource.readingTime} read</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Eye className="w-4 h-4 mr-2 text-primary" />
                    <span>{resource.meta?.views.toLocaleString()} views</span>
                  </div>
                </div>
                {resource.meta && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <ThumbsUp className="w-4 h-4 mr-2 text-primary" />
                    <span>{resource.meta.rating} rating • {resource.meta.downloads} downloads</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Link to={resource.downloadUrl} className="flex-1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    Preview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  onClick={() => handleDownload(resource)} 
                  className="flex-1 text-white"
                >
                  Download
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
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
    </div>
  );
};

export default ResourcesHub;
