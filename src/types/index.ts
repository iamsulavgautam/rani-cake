export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  ingredients?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  content: string;
  image?: string;
  rating: number;
  date: Date;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'> & {
  id?: string;
};

export type TestimonialFormData = Omit<Testimonial, 'id' | 'date'> & {
  id?: string;
};