import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';
import TestimonialForm from '../../components/admin/TestimonialForm';
import { Plus, Edit, Trash, Star, AlertTriangle, X } from 'lucide-react';
import { Testimonial, TestimonialFormData } from '../../types';

const ManageTestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check URL params for edit testimonial
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    
    if (editId) {
      const testimonialToEdit = testimonials.find(t => t.id === editId);
      if (testimonialToEdit) {
        setSelectedTestimonial(testimonialToEdit);
        setShowForm(true);
      }
    }
  }, [location.search, testimonials]);
  
  const handleAddNew = () => {
    setSelectedTestimonial(undefined);
    setShowForm(true);
  };
  
  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowForm(true);
    // Update URL to include edit param
    navigate(`/admin/testimonials?edit=${testimonial.id}`);
  };
  
  const handleFormSubmit = (data: TestimonialFormData) => {
    if (selectedTestimonial) {
      updateTestimonial({
        ...data,
        id: selectedTestimonial.id,
        date: selectedTestimonial.date,
      } as Testimonial);
    } else {
      addTestimonial(data);
    }
    
    setShowForm(false);
    setSelectedTestimonial(undefined);
    
    // Clear edit param from URL
    navigate('/admin/testimonials');
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedTestimonial(undefined);
    
    // Clear edit param from URL
    navigate('/admin/testimonials');
  };
  
  const confirmDelete = (id: string) => {
    setTestimonialToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = () => {
    if (testimonialToDelete) {
      deleteTestimonial(testimonialToDelete);
      setShowDeleteConfirm(false);
      setTestimonialToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTestimonialToDelete(null);
  };

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-accent-500 fill-accent-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-primary-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary-600 mb-2">Manage Testimonials</h1>
              <p className="text-gray-600">Add, edit, or remove customer testimonials.</p>
            </div>
            
            <Button 
              variant="primary" 
              icon={<Plus size={18} />}
              onClick={handleAddNew}
            >
              Add New Testimonial
            </Button>
          </div>
          
          {/* Testimonial Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialForm 
                  initialData={selectedTestimonial}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Testimonials List */}
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="divide-y divide-gray-200">
              {testimonials.length > 0 ? (
                testimonials.map(testimonial => (
                  <motion.div 
                    key={testimonial.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Customer Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-100">
                          <img 
                            src={testimonial.image || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{testimonial.name}</h3>
                            {testimonial.position && (
                              <p className="text-sm text-gray-500">{testimonial.position}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">"{testimonial.content}"</p>
                        <div className="text-sm text-gray-500">
                          {new Date(testimonial.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<Edit size={16} />}
                          onClick={() => handleEdit(testimonial)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          icon={<Trash size={16} />}
                          onClick={() => confirmDelete(testimonial.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p className="mb-4">No testimonials found.</p>
                  <Button 
                    variant="primary" 
                    icon={<Plus size={18} />}
                    onClick={handleAddNew}
                  >
                    Add Your First Testimonial
                  </Button>
                </div>
              )}
            </div>
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
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Testimonial</h3>
                    <p className="text-gray-600">
                      Are you sure you want to delete this testimonial? This action cannot be undone.
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

export default ManageTestimonialsPage;