export type Gender = 'men' | 'women' | 'unisex';

export type ClothingCategory =
  | 't-shirts'
  | 'shirts'
  | 'polo-shirts'
  | 'jeans'
  | 'trousers'
  | 'hoodies'
  | 'sweatshirts'
  | 'jackets'
  | 'shorts'
  | 'tops'
  | 'dresses'
  | 'skirts'
  | 'ethnic-wear'
  | 'accessories';

export type CollectionType =
  | 'new-arrivals'
  | 'best-sellers'
  | 'trending'
  | 'summer-collection'
  | 'winter-collection'
  | 'sale'
  | 'autumn-winter'
  | 'runway-edition'
  | 'minimalist-essentials';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  gender: Gender;
  subCategory: ClothingCategory;
  category: 'men' | 'women' | 'accessories' | 'seasonal' | 'trending';
  collection: string;
  tags: ('new' | 'bestseller' | 'sale' | 'limited' | 'exclusive' | 'trending')[];
  images: string[];
  description: string;
  details: string[];
  composition: string;
  careInstructions: string[];
  fit: string;
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  reviews?: ProductReview[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique combo of product id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface FilterOptions {
  category: string;
  subCategory?: string;
  gender?: string;
  collection: string;
  searchQuery: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
  inStockOnly: boolean;
}
