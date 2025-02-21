import { Resource } from '@/types/resources';

export const resources: Resource[] = [
  {
    id: "tech-spec-2024",
    title: "Technical Specifications Guide 2024",
    description: "Comprehensive technical specifications for all our herbal extracts and ingredients.",
    category: "technical",
    type: "pdf",
    fileSize: "2.5 MB",
    downloadUrl: "/resources/tech-spec-2024.pdf",
    date: "2024-01-15",
    readingTime: "15 min",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/team/sarah-johnson.jpg"
    },
    tags: ["Technical", "Specifications", "Quality Control"],
    meta: {
      views: 1250,
      downloads: 450,
      rating: 4.8
    }
  },
  {
    id: "research-paper-2023",
    title: "Efficacy Study: Herbal Extracts in Modern Medicine",
    description: "Research paper discussing the effectiveness of herbal extracts in contemporary medical applications.",
    category: "research",
    type: "pdf",
    fileSize: "3.8 MB",
    downloadUrl: "/resources/research-paper-2023.pdf",
    date: "2023-12-10",
    readingTime: "25 min",
    author: {
      name: "Dr. Michael Chen",
      avatar: "/team/michael-chen.jpg"
    },
    tags: ["Research", "Clinical Studies", "Medicine"],
    meta: {
      views: 2100,
      downloads: 780,
      rating: 4.9
    }
  },
  {
    id: "extraction-guide",
    title: "Best Practices in Herbal Extraction",
    description: "Comprehensive guide on extraction methods and best practices for optimal results.",
    category: "guide",
    type: "pdf",
    fileSize: "1.8 MB",
    downloadUrl: "/resources/extraction-guide.pdf",
    date: "2024-02-01",
    readingTime: "12 min",
    tags: ["Guide", "Extraction", "Best Practices"],
    meta: {
      views: 950,
      downloads: 320,
      rating: 4.7
    }
  },
  {
    id: "case-study-wellness",
    title: "Case Study: Wellness Product Development",
    description: "Success story of developing a new wellness product line using our ingredients.",
    category: "case-study",
    type: "presentation",
    fileSize: "5.2 MB",
    downloadUrl: "/resources/case-study-wellness.pptx",
    date: "2024-01-20",
    readingTime: "10 min",
    author: {
      name: "Jennifer Lee",
      avatar: "/team/jennifer-lee.jpg"
    },
    tags: ["Case Study", "Product Development", "Wellness"],
    meta: {
      views: 780,
      downloads: 245,
      rating: 4.6
    }
  },
  {
    id: "quality-control-doc",
    title: "Quality Control Documentation",
    description: "Detailed documentation of our quality control processes and standards.",
    category: "technical",
    type: "doc",
    fileSize: "1.5 MB",
    downloadUrl: "/resources/quality-control.docx",
    date: "2024-02-15",
    readingTime: "20 min",
    tags: ["Quality Control", "Documentation", "Standards"],
    meta: {
      views: 650,
      downloads: 180,
      rating: 4.5
    }
  },
  {
    id: "product-formulation",
    title: "Product Formulation Guidelines",
    description: "Guidelines for formulating products using our herbal extracts and ingredients.",
    category: "guide",
    type: "pdf",
    fileSize: "2.1 MB",
    downloadUrl: "/resources/formulation-guide.pdf",
    date: "2024-01-30",
    readingTime: "18 min",
    author: {
      name: "Dr. Robert Smith",
      avatar: "/team/robert-smith.jpg"
    },
    tags: ["Formulation", "Guidelines", "Product Development"],
    meta: {
      views: 1100,
      downloads: 420,
      rating: 4.8
    }
  }
]; 