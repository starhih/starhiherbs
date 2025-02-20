import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

// Reuse types from BlogList
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

const MOCK_POST: BlogPost = {
  id: "1",
  title: "Understanding Herbal Extract Standardization",
  excerpt: "A comprehensive guide to understanding the importance of standardization in herbal extracts and its impact on product quality.",
  content: `
    <h2>Introduction to Herbal Extract Standardization</h2>
    <p>Standardization is a crucial process in herbal extract manufacturing that ensures consistent quality and efficacy of the final product. This article explores the key aspects of standardization and its importance in the herbal supplement industry.</p>

    <h2>Why Standardization Matters</h2>
    <p>Standardization helps maintain consistent levels of active compounds across different batches of herbal extracts. This consistency is essential for:</p>
    <ul>
      <li>Ensuring product efficacy</li>
      <li>Meeting regulatory requirements</li>
      <li>Maintaining quality control</li>
      <li>Building consumer trust</li>
    </ul>

    <h2>Key Methods of Standardization</h2>
    <p>Several methods are employed in the standardization process:</p>
    <ol>
      <li>Chemical marker analysis</li>
      <li>Bioactive compound quantification</li>
      <li>Chromatographic fingerprinting</li>
      <li>Spectroscopic analysis</li>
    </ol>

    <h2>Best Practices in Standardization</h2>
    <p>Following industry best practices ensures reliable standardization:</p>
    <ul>
      <li>Regular testing and validation</li>
      <li>Documentation and record-keeping</li>
      <li>Quality control procedures</li>
      <li>Staff training and certification</li>
    </ul>

    <h2>Future of Standardization</h2>
    <p>The future of herbal extract standardization involves:</p>
    <ul>
      <li>Advanced analytical methods</li>
      <li>Automated quality control</li>
      <li>Blockchain technology for traceability</li>
      <li>AI-powered analysis</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Standardization remains a cornerstone of quality herbal extract manufacturing. As technology advances, we can expect even more precise and efficient standardization methods to emerge.</p>
  `,
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
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = MOCK_POST; // In real app, fetch post based on slug

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`,
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You might want to show a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Star Hi Herbs",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>{post.title} | Star Hi Herbs Blog</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-8 -ml-2 text-gray-600 hover:text-primary"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <Badge 
                variant="secondary"
                className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {post.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between border-y py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-gray-500">Author</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
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

            {/* Share Section */}
            <div className="border-t pt-8">
              <div className="flex items-center gap-4">
                <Share2 className="h-5 w-5 text-gray-400" />
                <span className="font-medium">Share this article:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('facebook')}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('twitter')}
                    className="text-sky-500 hover:text-sky-600 hover:bg-sky-50"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('linkedin')}
                    className="text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyLink}
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <LinkIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost; 