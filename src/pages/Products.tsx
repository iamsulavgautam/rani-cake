import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import ProductGrid from '../components/products/ProductGrid';
import { useStore } from '../contexts/StoreContext';

const ProductsPage: React.FC = () => {
  const { products, searchProducts } = useStore();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const location = useLocation();

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))];

  // Handle URL query params for category filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Filter products based on search query and selected category
  useEffect(() => {
    let result = products;
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, searchProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20" >
        {/* Hero Banner */}
        <div
  className="text-white py-16 px-4"
  style={{ backgroundColor: "#b82a29" }}
>

          <div className="container mx-auto" >
            <motion.h1 
              className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Rani Cake Products
            </motion.h1>
            <motion.p 
              className="text-xl text-center max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Browse selection from rani cake made with love and premium ingredients.
            </motion.p>

            {/* Search and Filter */}
            <motion.div 
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <SearchBar 
                placeholder="Search for products..." 
                onSearch={handleSearch} 
                className="shadow-md"
              />
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filters */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-gray-700 mb-3">Filter by Category</h2>
            <div className="flex flex-wrap gap-2">
              <motion.button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleCategoryChange(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
              
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Product Results */}
          <AnimatePresence mode="wait">
            <div>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    className="text-primary-500 hover:text-primary-700 text-sm font-medium"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
              
              <ProductGrid products={filteredProducts} />
            </div>
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;