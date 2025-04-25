import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Home, ChevronLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 bg-cream">
        <motion.div 
          className="max-w-lg w-full mx-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <motion.div 
              className="relative mx-auto w-48 h-48"
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -5, 0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <div className="absolute inset-0 bg-primary-500 rounded-full opacity-10"></div>
              <div className="absolute inset-2 bg-primary-200 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-8xl font-serif font-bold text-primary-600">
                404
              </div>
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-primary-600 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              variant="primary"
              icon={<Home size={18} />}
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
            <Button 
              variant="outline"
              icon={<ChevronLeft size={18} />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;