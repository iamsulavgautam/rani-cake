import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag, CakeSlice, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary-500 bg-opacity-95 shadow-md' : 'bg-transparent'
      }`}

      style={{ backgroundColor: "#b82a29" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <CakeSlice size={32}  /> */}
            <img
    src="/img/rani.jpg"       
    alt="Rani Cake logo"
    className="w-8 h-8 object-contain"
  />
            <span className="text-xl font-serif font-bold text-white">Rani Cake</span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className={`text-white font-medium hover:text-accent-300 transition-colors ${location.pathname === '/' ? 'border-b-2 border-accent-500' : ''}`}
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                to="/products"
                className={`text-white font-medium hover:text-accent-300 transition-colors ${location.pathname === '/products' ? 'border-b-2 border-accent-500' : ''}`}
              >
                Products
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                to="/about"
                className={`text-white font-medium hover:text-accent-300 transition-colors ${location.pathname === '/about' ? 'border-b-2 border-accent-500' : ''}`}
              >
                About
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                to="/contact"
                className={`text-white font-medium hover:text-accent-300 transition-colors ${location.pathname === '/contact' ? 'border-b-2 border-accent-500' : ''}`}
              >
                Contact
              </Link>
            </motion.div>
            {isAuthenticated && user?.isAdmin && (
              <motion.div variants={itemVariants}>
                <Link
                  to="/admin"
                  className={`text-white font-medium hover:text-accent-300 transition-colors ${location.pathname.startsWith('/admin') ? 'border-b-2 border-accent-500' : ''}`}
                >
                  Admin
                </Link>
              </motion.div>
            )}
            {isAuthenticated ? (
              <motion.button
                variants={itemVariants}
                onClick={logout}
                className="flex items-center text-white hover:text-accent-300 transition-colors"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </motion.button>
            ) : (
              <motion.div variants={itemVariants}>
                <Link
                  to="/login"
                  className="flex items-center text-white hover:text-accent-300 transition-colors"
                >
                  <Lock size={18} className="mr-1" />
                  Login
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-primary-500 bg-opacity-95"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-4">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block text-white hover:text-accent-300 transition-colors ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={closeMenu}
              className={`block text-white hover:text-accent-300 transition-colors ${location.pathname === '/products' ? 'font-bold' : ''}`}
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`block text-white hover:text-accent-300 transition-colors ${location.pathname === '/about' ? 'font-bold' : ''}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`block text-white hover:text-accent-300 transition-colors ${location.pathname === '/contact' ? 'font-bold' : ''}`}
            >
              Contact
            </Link>
            {isAuthenticated && user?.isAdmin && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className={`block text-white hover:text-accent-300 transition-colors ${location.pathname.startsWith('/admin') ? 'font-bold' : ''}`}
              >
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center text-white hover:text-accent-300 transition-colors"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center text-white hover:text-accent-300 transition-colors"
              >
                <Lock size={18} className="mr-1" />
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;