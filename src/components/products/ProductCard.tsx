import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "../../types";
import { Edit, Trash } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = isAuthenticated && user?.isAdmin;

  // ────────────────────────────────────────────────────────────
  // Ensure price is a number so calling .toFixed never crashes.
  // Invalid or missing price shows “N/A”.
  // ────────────────────────────────────────────────────────────
  const priceNum = Number(product.price);
  const priceMarkup = isFinite(priceNum)
    ? `${priceNum.toFixed(2)}`
    : "N/A";

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          {product.featured && (
            <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
              Featured
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-medium text-gray-800 hover:text-primary-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="font-bold text-primary-500"> Rs {priceMarkup}</span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
            {product.category}
          </span>

          {isAdmin && (
            <div className="flex space-x-2">
              {onEdit && (
                <motion.button
                  onClick={() => onEdit(product)}
                  className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={18} />
                </motion.button>
              )}

              {onDelete && (
                <motion.button
                  onClick={() => onDelete(product.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash size={18} />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
