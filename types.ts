
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ThemeSettings {
  primaryColor: string; // Hex code
  fontFamily: 'sans' | 'serif' | 'mono';
  viewMode: 'grid' | 'list';
}

export const CATEGORIES = ['All', 'Clothes', 'Watches', 'Bags', 'Bottles', 'Shoes', 'Perfumes', 'Ladies Footwear'];

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];
