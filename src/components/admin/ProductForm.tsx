import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product, ProductFormData } from '../../types';
import Button from '../common/Button';
import { Save, X } from 'lucide-react';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData, file?: File) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    featured: false,
    ingredients: [],
    nutritionInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  });

  const [ingredientInput, setIngredientInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
      if (initialData.image) {
        setPreviewUrl(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name.startsWith('nutritionInfo.')) {
      const nutritionField = name.split('.')[1];
      setFormData({
        ...formData,
        nutritionInfo: {
          ...formData.nutritionInfo!,
          [nutritionField]: parseFloat(value) || 0,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors({ ...errors, image: '' });
    }
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      const newIngredients = [...(formData.ingredients || []), ingredientInput.trim()];
      setFormData({ ...formData, ingredients: newIngredients });
      setIngredientInput('');
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...(formData.ingredients || [])];
    newIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!initialData && !selectedFile) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData, selectedFile || undefined);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
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
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h2>
        <Button variant="text" onClick={onCancel} icon={<X size={18} />}>
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Product Name
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
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                Price (Rs)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                <option value="Bread">Bread</option>
                <option value="Pastries">Pastries</option>
                <option value="Cakes">Cakes</option>
                <option value="Muffins">Muffins</option>
                <option value="Desserts">Desserts</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {previewUrl && (
              <div className="mt-2 border rounded-md overflow-hidden h-32 w-full">
                <img src={previewUrl} alt="Product preview" className="w-full h-full object-cover" />
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label className="ml-2 text-gray-700" htmlFor="featured">
              Featured Product
            </label>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
            <div className="flex">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="Add ingredient"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors"
              >
                Add
              </button>
            </div>

            <ul className="mt-2 space-y-1">
              {formData.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium mb-2">Nutrition Information</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1" htmlFor="calories">
                  Calories
                </label>
                <input
                  type="number"
                  id="calories"
                  name="nutritionInfo.calories"
                  value={formData.nutritionInfo?.calories || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1" htmlFor="protein">
                  Protein (g)
                </label>
                <input
                  type="number"
                  id="protein"
                  name="nutritionInfo.protein"
                  value={formData.nutritionInfo?.protein || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1" htmlFor="carbs">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  id="carbs"
                  name="nutritionInfo.carbs"
                  value={formData.nutritionInfo?.carbs || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1" htmlFor="fat">
                  Fat (g)
                </label>
                <input
                  type="number"
                  id="fat"
                  name="nutritionInfo.fat"
                  value={formData.nutritionInfo?.fat || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="mt-8 flex justify-end" variants={itemVariants}>
        <Button type="submit" variant="primary" size="lg" icon={<Save size={18} />}>
          {initialData ? 'Update Product' : 'Add Product'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ProductForm;