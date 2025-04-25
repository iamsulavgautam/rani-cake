import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import ProductGrid from '../../components/products/ProductGrid';
import ProductForm from '../../components/admin/ProductForm';
import { Plus, X, AlertTriangle } from 'lucide-react';
import { Product, ProductFormData } from '../../types';

const ManageProductsPage: React.FC = () => {
  const { products, searchProducts, addProduct, updateProduct, deleteProduct } = useStore();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check URL params for edit product
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    
    if (editId) {
      const productToEdit = products.find(p => p.id === editId);
      if (productToEdit) {
        setSelectedProduct(productToEdit);
        setShowForm(true);
      }
    }
  }, [location.search, products]);
  
  // Filter products based on search
  useEffect(() => {
    let result = products;
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, searchProducts]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleAddNew = () => {
    setSelectedProduct(undefined);
    setShowForm(true);
  };
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
    // Update URL to include edit param
    navigate(`/admin/products?edit=${product.id}`);
  };
  
  const handleFormSubmit = (data: ProductFormData) => {
    if (selectedProduct) {
      updateProduct({
        ...data,
        id: selectedProduct.id,
        createdAt: selectedProduct.createdAt,
      } as Product);
    } else {
      addProduct(data);
    }
    
    setShowForm(false);
    setSelectedProduct(undefined);
    
    // Clear edit param from URL
    navigate('/admin/products');
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedProduct(undefined);
    
    // Clear edit param from URL
    navigate('/admin/products');
  };
  
  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-primary-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary-600 mb-2">Manage Products</h1>
              <p className="text-gray-600">Add, edit, or remove bakery products.</p>
            </div>
            
            <Button 
              variant="primary" 
              icon={<Plus size={18} />}
              onClick={handleAddNew}
            >
              Add New Product
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              placeholder="Search products by name, description, or category..." 
              onSearch={handleSearch} 
              className="max-w-xl"
            />
          </div>
          
          {/* Product Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductForm 
                  initialData={selectedProduct}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Products Grid */}
          <div>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              {searchQuery && (
                <button
                  className="text-primary-500 hover:text-primary-700 text-sm font-medium"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              )}
            </div>
            
            <ProductGrid 
              products={filteredProducts} 
              onEdit={handleEdit}
              onDelete={confirmDelete}
            />
          </div>
        </div>
        
        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-6 max-w-md w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start mb-4">
                  <div className="bg-red-100 rounded-full p-2 mr-3">
                    <AlertTriangle className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Product</h3>
                    <p className="text-gray-600">
                      Are you sure you want to delete this product? This action cannot be undone.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={cancelDelete}
                    icon={<X size={18} />}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManageProductsPage;