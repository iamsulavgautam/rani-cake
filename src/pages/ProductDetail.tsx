import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useStore } from '../contexts/StoreContext';
import Button from '../components/common/Button';
import { ArrowLeft, Clock, Wheat, ChevronRight } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getProductsByCategory } = useStore();
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderOptions, setShowOrderOptions] = useState(false);


  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);

      if (foundProduct) {
        // Get related products (same category, excluding current product)
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }

      setLoading(false);
    }
  }, [id, getProductById, getProductsByCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"
          ></motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex text-sm text-gray-500">
              <li className="hover:text-primary-500 transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="mx-2">
                <ChevronRight size={16} />
              </li>
              <li className="hover:text-primary-500 transition-colors">
                <Link to="/products">Products</Link>
              </li>
              <li className="mx-2">
                <ChevronRight size={16} />
              </li>
              <li className="hover:text-primary-500 transition-colors">
                <Link to={`/products?category=${product.category}`}>{product.category}</Link>
              </li>
              <li className="mx-2">
                <ChevronRight size={16} />
              </li>
              <li className="font-medium text-primary-600">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg h-[300px] sm:h-[400px] md:h-[500px]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent-500 font-medium text-sm mb-2">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">{product.name}</h1>

              <div className="mb-6">
                <span className="text-2xl font-bold text-primary-600">Rs {product.price.toFixed(2)}</span>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-primary-50 px-4 py-2 rounded-lg">
                  <Clock size={20} className="text-primary-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Freshness</p>
                    <p className="text-sm font-medium">Baked Daily</p>
                  </div>
                </div>

                <div className="flex items-center bg-primary-50 px-4 py-2 rounded-lg">
                  <Wheat size={20} className="text-primary-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Ingredients</p>
                    <p className="text-sm font-medium">{product.ingredients?.length || 0} Premium Items</p>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Ingredients</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition Info */}
              {product.nutritionInfo && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Nutrition Information</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="text-lg font-bold text-primary-600">{product.nutritionInfo.calories}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="text-lg font-bold text-primary-600">{product.nutritionInfo.protein}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Carbs</p>
                      <p className="text-lg font-bold text-primary-600">{product.nutritionInfo.carbs}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Fat</p>
                      <p className="text-lg font-bold text-primary-600">{product.nutritionInfo.fat}g</p>
                    </div>
                  </div>
                </div>
              )}


<div className="mt-auto pt-4 space-y-4">
  {!showOrderOptions ? (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      onClick={() => setShowOrderOptions(true)}
    >
      Order Now
    </Button>
  ) : (
    <div className="space-y-4">
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={() => {   window.location.href = 'tel:9847940662';  }}

        // onClick={() => window.open('https://www.facebook.com/yourpage', '_blank')}
      >
        Order via Number
      </Button>
      <Button
        variant="success"
        size="lg"
        fullWidth
        onClick={() => window.open('https://wa.me/9779847940662', '_blank')}
      >
        Order via WhatsApp
      </Button>
    </div>
  )}
</div>

              {/* <div className="mt-auto pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {

                    window.location.href = 'tel:9847940662';
                  }}

                >
                  Order Now
                </Button>
              </div> */}
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <motion.h2
                className="text-2xl font-serif font-bold text-gray-800 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                You May Also Like
              </motion.h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}

          {/* Back Button */}
          <div className="mt-16 mb-4">
            <Button
              variant="outline"
              icon={<ArrowLeft size={16} />}
              onClick={() => navigate('/products')}
            >
              Back to Products
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;