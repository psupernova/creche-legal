export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: number;
  keywords: string[];
  content: string;
  categoryId?: string;
  category?: BlogCategory;
}