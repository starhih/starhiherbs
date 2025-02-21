export type ResourceCategory = 'technical' | 'research' | 'guide' | 'case-study';
export type ResourceType = 'pdf' | 'doc' | 'video' | 'presentation';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  fileSize: string;
  downloadUrl: string;
  date: string;
  readingTime?: string;
  author?: {
    name: string;
    avatar: string;
  };
  tags?: string[];
  meta?: {
    views: number;
    downloads: number;
    rating: number;
  };
} 