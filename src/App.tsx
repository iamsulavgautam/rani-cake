import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import AdminDashboardPage from './pages/admin/Dashboard';
import AdminProductsPage from './pages/admin/ManageProducts';
import AdminTestimonialsPage from './pages/admin/ManageTestimonials';
import PrivateRoute from './components/admin/PrivateRoute';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
            <Route path="/admin/products" element={<PrivateRoute><AdminProductsPage /></PrivateRoute>} />
            <Route path="/admin/testimonials" element={<PrivateRoute><AdminTestimonialsPage /></PrivateRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;