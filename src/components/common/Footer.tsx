import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CakeSlice } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-600 text-white" style={{ backgroundColor: "#b82a29" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bakery Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* <CakeSlice size={24} className="text-accent-500" /> */}
              <img
                src="/img/rani.jpg"
                alt="Rani Cake logo"
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-xl font-serif font-bold">Rani Cake</h3>
            </div>
            <p className="mb-4 text-gray-300">
              Handcrafted bakery goods made with love since 2010. Rani Cake only use the finest ingredients to create delicious treats for every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-accent-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-accent-500 transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Bread" className="hover:text-accent-500 transition-colors">Bread</Link>
              </li>
              <li>
                <Link to="/products?category=Pastries" className="hover:text-accent-500 transition-colors">Pastries</Link>
              </li>
              <li>
                <Link to="/products?category=Cakes" className="hover:text-accent-500 transition-colors">Cakes</Link>
              </li>
              <li>
                <Link to="/products?category=Muffins" className="hover:text-accent-500 transition-colors">Muffins</Link>
              </li>
              <li>
                <Link to="/products?category=Desserts" className="hover:text-accent-500 transition-colors">Desserts</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-accent-500 mr-2 mt-1 flex-shrink-0" />
                <span>Tulsipur, Dang</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-accent-500 mr-2 flex-shrink-0" />
                <a href="tel:9847940662" className="hover:underline text-current">
                  9847940662
                </a>
              </li>

              <li className="flex items-center">
                <Mail size={20} className="text-accent-500 mr-2 flex-shrink-0" />
                <span>ranicake50@gamil.com</span>
              </li>
              <li className="mt-4">
                <h4 className="font-medium mb-1">Hours</h4>
                <p className="text-sm text-gray-300">Mon-Fri: 7am - 6pm</p>
                <p className="text-sm text-gray-300">Sat-Sun: 8am - 3pm</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rani Cake Bakery. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-accent-500 transition-colors">Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-accent-500 transition-colors ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;