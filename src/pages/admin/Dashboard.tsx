import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Card from '../../components/common/Card';
import { ShoppingBag, MessageCircle, User, Clock, TrendingUp, Edit } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { products, testimonials } = useStore();
  const { user } = useAuth();
  
  const dashboardCards = [
    {
      title: 'Products',
      count: products.length,
      icon: <ShoppingBag size={24} className="text-orange-500" />,
      bgColor: 'bg-orange-50',
      iconBgColor: 'bg-orange-100',
      link: '/admin/products',
    },
    {
      title: 'Testimonials',
      count: testimonials.length,
      icon: <MessageCircle size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-blue-100',
      link: '/admin/testimonials',
    },
    {
      title: 'Admin Users',
      count: 1,
      icon: <User size={24} className="text-green-500" />,
      bgColor: 'bg-green-50',
      iconBgColor: 'bg-green-100',
      link: '#',
    }
  ];
  
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-primary-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl font-serif font-bold text-primary-600 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Admin Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Welcome back, {user?.username}! Manage your bakery products and testimonials.
            </motion.p>
          </div>
          
          {/* Dashboard Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {dashboardCards.map((card, index) => (
              <Link to={card.link} key={index}>
                <Card className={`${card.bgColor} p-6 hover:shadow-md transition-shadow`} hoverable>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">{card.title}</h3>
                      <p className="text-3xl font-bold text-primary-600">{card.count}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${card.iconBgColor} flex items-center justify-center`}>
                      {card.icon}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Products */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="p-6 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold text-primary-600">Recent Products</h2>
                  <Link to="/admin/products" className="text-sm text-primary-500 hover:text-primary-700 flex items-center">
                    View All <TrendingUp size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs{product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link to={`/admin/products?edit=${product.id}`} className="text-blue-600 hover:text-blue-900">
                              <Edit size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                      
                      {recentProducts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
            
            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="p-6 h-full">
                <h2 className="text-xl font-serif font-bold text-primary-600 mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={20} className="text-blue-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">You logged in</div>
                      <div className="text-sm text-gray-500">Just now</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Clock size={20} className="text-green-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Daily Backup</div>
                        <div className="text-sm text-gray-500">6 hours ago</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <ShoppingBag size={20} className="text-orange-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">New product added</div>
                        <div className="text-sm text-gray-500">Yesterday</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="text-sm text-primary-500 hover:text-primary-700">
                    View Full Activity Log
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;