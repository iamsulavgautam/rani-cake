import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onEdit, onDelete }) => {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <motion.div 
            className="col-span-full text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-500 text-lg">No products found.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductGrid;