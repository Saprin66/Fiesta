export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: { slug: string; name: string };
  price: number;
  oldPrice: number | null;
  images: string[];
  description: string;
  fullDescription: string;
  specs: ProductSpec[];
  inStock: boolean;
  isNew: boolean;
  isHit: boolean;
  isShowroom: boolean;
  condition: string | null;
  discountReason: string | null;
  isLast: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

export interface Review {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  text: string;
  productName: string | null;
  createdAt: string;
}

export interface ProductFilter {
  category?: string;
  showroom?: boolean;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: 'popular' | 'price-asc' | 'price-desc' | 'new';
}
