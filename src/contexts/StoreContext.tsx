import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Product, Testimonial } from "../types";
import {
  getProducts,
  saveProducts,
  addProduct as addProductRaw,
  updateProduct as updateProductRaw,
  deleteProduct as deleteProductRaw,
  getTestimonials,
  addTestimonial as addTestimonialRaw,
  updateTestimonial as updateTestimonialRaw,
  deleteTestimonial as deleteTestimonialRaw,
} from "../utils/storage";

/* ────────────────────────────────────────────────────────── */
/* Helpers                                                   */
/* ────────────────────────────────────────────────────────── */
const toNumber = (v: unknown) => (isFinite(+v) ? +v : 0);
const normaliseProduct = (p: Product): Product => ({
  ...p,
  price: toNumber(p.price),
});

/* ────────────────────────────────────────────────────────── */

interface StoreContextType {
  products: Product[];
  testimonials: Testimonial[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Product;
  updateProduct: (product: Product) => Product;
  deleteProduct: (id: string) => void;
  addTestimonial: (
    testimonial: Omit<Testimonial, "id" | "date">
  ) => Testimonial;
  updateTestimonial: (testimonial: Testimonial) => Testimonial;
  deleteTestimonial: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  searchProducts: (query: string) => Product[];
}

const StoreContext = createContext<StoreContextType>({} as StoreContextType);
export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  /* ───────── Load initial data ───────── */
  useEffect(() => {
    const loadedProducts = getProducts().map(normaliseProduct);
    const loadedTestimonials = getTestimonials();
    setProducts(loadedProducts);
    setTestimonials(loadedTestimonials);
    setLoading(false);
  }, []);

  /* ───────── Products CRUD ───────── */
  const addProduct = (p: Omit<Product, "id" | "createdAt">) => {
    const newP = normaliseProduct(addProductRaw(p));
    setProducts((prev) => [...prev, newP]);
    return newP;
  };

  const updateProduct = (p: Product) => {
    const upd = normaliseProduct(updateProductRaw(p));
    setProducts((prev) => prev.map((x) => (x.id === p.id ? upd : x)));
    return upd;
  };

  const deleteProduct = (id: string) => {
    deleteProductRaw(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* ───────── Testimonials CRUD (unchanged) ───────── */
  const addTestimonial = (t: Omit<Testimonial, "id" | "date">) => {
    const newT = addTestimonialRaw(t);
    setTestimonials((prev) => [...prev, newT]);
    return newT;
  };

  const updateTestimonial = (t: Testimonial) => {
    const upd = updateTestimonialRaw(t);
    setTestimonials((prev) => prev.map((x) => (x.id === t.id ? upd : x)));
    return upd;
  };

  const deleteTestimonial = (id: string) => {
    deleteTestimonialRaw(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  /* ───────── Helpers / selectors ───────── */
  const getProductById = (id: string) =>
    products.find((p) => p.id === id);

  const getProductsByCategory = (cat: string) =>
    products.filter((p) => p.category === cat);

  const getFeaturedProducts = () => products.filter((p) => p.featured);

  const searchProducts = (q: string) => {
    const s = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  };

  /* ───────── Provider ───────── */
  return (
    <StoreContext.Provider
      value={{
        products,
        testimonials,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        searchProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
