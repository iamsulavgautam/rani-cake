import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Testimonial, TestimonialFormData } from '../../types';
import Button from '../common/Button';
import { Save, X, Star } from 'lucide-react';

interface TestimonialFormProps {
  initialData?: Testimonial;
  onSubmit: (data: TestimonialFormData) => void;
  onCancel: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    position: '',
    content: '',
    image: '',
    rating: 5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.content.trim()) newErrors.content = 'Testimonial content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.form 
      className="bg-white rounded-lg shadow-lg p-6"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-primary-600">
          {initialData ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>
        <Button 
          variant="text" 
          onClick={onCancel}
          icon={<X size={18} />}
        >
          Cancel
        </Button>
      </div>

      <div className="space-y-4">
        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Customer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="position">
            Position/Title (Optional)
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
            Testimonial Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
            Customer Image URL (Optional)
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {formData.image && (
            <div className="mt-2 border rounded-md overflow-hidden h-32 w-32">
              <img src={formData.image} alt="Customer preview" className="w-full h-full object-cover" />
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  className={`${
                    star <= formData.rating
                      ? 'text-accent-500 fill-accent-500'
                      : 'text-gray-300'
                  } hover:text-accent-400 transition-colors`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 flex justify-end"
        variants={itemVariants}
      >
        <Button 
          type="submit" 
          variant="primary"
          size="lg"
          icon={<Save size={18} />}
        >
          {initialData ? 'Update Testimonial' : 'Add Testimonial'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default TestimonialForm;