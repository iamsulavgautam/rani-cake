import React from 'react';
import { color, motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TestimonialSection from '../components/home/TestimonialSection';
import { Coffee, Award, Clock, Users } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featureItems = [
    {
      icon: <Coffee size={36} className="text-accent-500" />,
      title: 'Artisan Quality',
      description: 'Handcrafted with traditional techniques and finest ingredients for exceptional taste and texture.'
    },
    {
      icon: <Award size={36} className="text-accent-500" />,
      title: 'Award Winning',
      description: 'Our bakery has been recognized for excellence with multiple local and national awards.'
    },
    {
      icon: <Clock size={36} className="text-accent-500" />,
      title: 'Fresh Daily',
      description: 'Everything is baked fresh each morning for maximum flavor and freshness.'
    },
    {
      icon: <Users size={36} className="text-accent-500" />,
      title: 'Community Focus',
      description: 'We source locally whenever possible and actively support community initiatives.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" >
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Feature Section */}
        <section className="py-16 "   style={{ backgroundColor: "#b82a29" }} >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                   Why Choose Rani Cake
              </h2>

              <div className="w-24 h-1 bg-accent-500 mx-auto mb-4"></div>
              <p className="text-white-600 max-w-2xl mx-auto">
                At Rani Cake, we take pride in our commitment to quality, community, and the art of baking cake to make your ocassion special.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-primary-50 rounded-lg p-6 text-center shadow-subtle hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <FeaturedProducts />
        
        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* Call to Action */}
        <section className="py-20 bg-primary-600 text-white relative overflow-hidden"  style={{ backgroundColor: "#b82a29"}}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-repeat" 
                 style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')" }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 rounded-lg p-8 md:p-12 backdrop-blur-sm border border-white border-opacity-20 max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Experience Our Bakery?
              </h2>
              <p className="text-lg mb-8 text-gray-100">
                Visit our bakery today or place an order online for pickup. We'd love to serve you!
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <motion.button
                  className="px-8 py-3 bg-accent-500 text-white rounded-md font-medium shadow-sm hover:bg-accent-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Visit Our Store
                </motion.button>
                <motion.button
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/contact')}
                  
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;