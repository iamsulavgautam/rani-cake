import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    // <div className="relative min-h-screen bg-gradient-to-b from-primary-600 to-primary-800 flex items-center"  style={{ backgroundColor: "#b82a29 !important"}}>

<div className="relative min-h-screen bg-[#b82a29] flex items-center text-white">

    {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-repeat-x" 
             style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')" }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <motion.div 
          className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Rani Cake <br />
            <span className="text-accent-400">Khushi Thapdai</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-200 mb-8 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Rani Cake freshly baked cakes, pastries, and desserts made with traditional techniques and premium ingredients.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
             <Link 
    to="/products"
    className="bg-secondary text-white text-lg px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
  >
    Explore Our Products
  </Link>

  <Link 
    to="/about"
    className="border border-white text-white text-lg px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
  >
    Story of Rani Cake
  </Link>
          </motion.div>
        </motion.div>
        
        {/* Hero Image */}
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <motion.img 
              src="/img/group.jpg"    
              alt="Assorted Bakery Products" 
              className="rounded-lg shadow-2xl w-full"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.5,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            />
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 w-32 sm:w-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-primary-500 font-bold text-xs sm:text-sm">Customer Favorite</p>
              <p className="font-serif font-medium text-sm sm:text-base">Chocolate Croissant</p>
              <div className="mt-1 flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -top-4 -right-4 bg-accent-500 text-white font-bold rounded-full w-20 h-20 flex items-center justify-center text-center text-sm sm:text-base"
              initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              Rani Cake
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center items-start p-1"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="bg-white w-1 h-3 rounded-full"></div>
        </motion.div>
        <p className="text-white text-sm mt-2 text-center">Scroll Down</p>
      </motion.div>
    </div>
  );
};

export default Hero;