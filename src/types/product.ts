export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image: string;
  link: string;
  categoryId: string;
  category?: ProductCategory;
  featured?: boolean;
  order?: number;
  inStock?: boolean;
  affiliateCode?: string;
}