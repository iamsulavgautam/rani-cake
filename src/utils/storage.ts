import { Product, Testimonial, User } from '../types';
import { initialProducts, initialTestimonials, initialUsers } from '../data/initialData';

// Product Storage Functions
export const getProducts = (): Product[] => {
  const products = localStorage.getItem('bakery-products');
  if (products) {
    try {
      // Convert date strings back to Date objects
      return JSON.parse(products, (key, value) => {
        if (key === 'createdAt') {
          return new Date(value);
        }
        return value;
      });
    } catch (error) {
      console.error('Error parsing products from localStorage:', error);
      return initialProducts;
    }
  }
  // Initialize with default products
  localStorage.setItem('bakery-products', JSON.stringify(initialProducts));
  return initialProducts;
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('bakery-products', JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  saveProducts([...products, newProduct]);
  return newProduct;
};

export const updateProduct = (product: Product): Product => {
  const products = getProducts();
  const updatedProducts = products.map(p => p.id === product.id ? product : p);
  saveProducts(updatedProducts);
  return product;
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  saveProducts(filteredProducts);
};

// Testimonial Storage Functions
export const getTestimonials = (): Testimonial[] => {
  const testimonials = localStorage.getItem('bakery-testimonials');
  if (testimonials) {
    try {
      // Convert date strings back to Date objects
      return JSON.parse(testimonials, (key, value) => {
        if (key === 'date') {
          return new Date(value);
        }
        return value;
      });
    } catch (error) {
      console.error('Error parsing testimonials from localStorage:', error);
      return initialTestimonials;
    }
  }
  // Initialize with default testimonials
  localStorage.setItem('bakery-testimonials', JSON.stringify(initialTestimonials));
  return initialTestimonials;
};

export const saveTestimonials = (testimonials: Testimonial[]): void => {
  localStorage.setItem('bakery-testimonials', JSON.stringify(testimonials));
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'date'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    date: new Date(),
  };
  saveTestimonials([...testimonials, newTestimonial]);
  return newTestimonial;
};

export const updateTestimonial = (testimonial: Testimonial): Testimonial => {
  const testimonials = getTestimonials();
  const updatedTestimonials = testimonials.map(t => t.id === testimonial.id ? testimonial : t);
  saveTestimonials(updatedTestimonials);
  return testimonial;
};

export const deleteTestimonial = (id: string): void => {
  const testimonials = getTestimonials();
  const filteredTestimonials = testimonials.filter(t => t.id !== id);
  saveTestimonials(filteredTestimonials);
};

// User Storage Functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem('bakery-users');
  if (users) {
    try {
      return JSON.parse(users);
    } catch (error) {
      console.error('Error parsing users from localStorage:', error);
      return initialUsers;
    }
  }
  // Initialize with default admin user
  localStorage.setItem('bakery-users', JSON.stringify(initialUsers));
  return initialUsers;
};

export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
};