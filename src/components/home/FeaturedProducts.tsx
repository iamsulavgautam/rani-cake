import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../contexts/StoreContext';
import ProductCard from '../products/ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const { getFeaturedProducts } = useStore();
  const featuredProducts = getFeaturedProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = { mobile: 1, tablet: 2, desktop: 3 };
  const [viewCount, setViewCount] = useState(productsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewCount(productsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setViewCount(productsPerView.tablet);
      } else {
        setViewCount(productsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex + viewCount >= featuredProducts.length ? 0 : prevIndex + viewCount
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex - viewCount < 0 ? Math.max(0, featuredProducts.length - viewCount) : prevIndex - viewCount
    );
  };

  const displayedProducts = featuredProducts.slice(currentIndex, currentIndex + viewCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-600 mb-3">
            Featured Products
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular bakery creations, made fresh daily with high-quality ingredients and traditional techniques.
          </p>
        </motion.div>

        <div className="relative">
          {featuredProducts.length > viewCount && (
            <>
              <motion.button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md z-10 text-primary-500 hover:text-primary-700 focus:outline-none sm:-translate-x-7"
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={24} />
              </motion.button>
              
              <motion.button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md z-10 text-primary-500 hover:text-primary-700 focus:outline-none sm:translate-x-7"
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={24} />
              </motion.button>
            </>
          )}

          <motion.div
            className="overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {displayedProducts.map(product => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-3 bg-primary-500 text-white rounded-md font-medium shadow-sm hover:bg-primary-600 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >

            
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;