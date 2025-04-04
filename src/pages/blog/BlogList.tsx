import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Tags,
  Filter,
  Star,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
  imageUrl: string;
  slug: string;
};

const CATEGORIES = [
  { id: "all", name: "All Articles" },
  { id: "formulation", name: "Formulation" },
  { id: "quality-control", name: "Quality Control" },
  { id: "research", name: "Research & Studies" },
  { id: "industry", name: "Industry Insights" },
  { id: "regulations", name: "Regulations" },
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Herbal Extract Standardization",
    excerpt: "A comprehensive guide to understanding the importance of standardization in herbal extracts and its impact on product quality.",
    content: "",
    category: "quality-control",
    tags: ["Standardization", "Quality Control", "Manufacturing"],
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/avatars/sarah-chen.jpg"
    },
    publishedAt: "2024-03-19",
    readingTime: 8,
    imageUrl: "/blog/standardization-guide.jpg",
    slug: "understanding-herbal-extract-standardization"
  },
  {
    id: "2",
    title: "Best Practices for Supplement Formulation",
    excerpt: "Learn about the key considerations and best practices when formulating herbal supplements for optimal efficacy.",
    content: "",
    category: "formulation",
    tags: ["Formulation", "Best Practices", "Development"],
    author: {
      name: "Michael Roberts",
      avatar: "/avatars/michael-roberts.jpg"
    },
    publishedAt: "2024-03-18",
    readingTime: 12,
    imageUrl: "/blog/formulation-practices.jpg",
    slug: "best-practices-supplement-formulation"
  },
  {
    id: "3",
    title: "Latest Trends in Herbal Supplement Industry",
    excerpt: "Explore the current trends and future predictions in the herbal supplement industry and their impact on manufacturers.",
    content: "",
    category: "industry",
    tags: ["Industry Trends", "Market Analysis", "Innovation"],
    author: {
      name: "Lisa Thompson",
      avatar: "/avatars/lisa-thompson.jpg"
    },
    publishedAt: "2024-03-17",
    readingTime: 10,
    imageUrl: "/blog/industry-trends.jpg",
    slug: "latest-trends-herbal-supplement-industry"
  }
];

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            Industry Insights
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, research, and best practices in the herbal supplement industry.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white"
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-11 bg-white">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white"
                      >
                        {CATEGORIES.find(c => c.id === post.category)?.name}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {post.author.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary-dark"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogList; 