import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Send, MapPin, Phone, Mail, Clock, Check } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Banner */}
        <div className="relative bg-primary-700 text-white" style={{ backgroundColor: "#b82a29" }}>
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-0 left-0 right-0 h-full bg-repeat"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')" }}></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10" >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
              <p className="text-xl mb-0">We'd love to hear from you! Get in touch with any questions, feedback, or special orders.</p>
            </motion.div>
          </div>
        </div>

        {/* Contact Information & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Information */}
              <motion.div
                className="lg:w-1/3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-primary-50 p-8 rounded-lg shadow-subtle h-full">
                  <h2 className="text-2xl font-serif font-bold text-primary-600 mb-6">Get In Touch</h2>

                  <ul className="space-y-6">
                    <li className="flex">
                      <div className="mt-1 mr-4">
                        <div className="bg-primary-100 p-2 rounded-full text-primary-500">
                          <MapPin size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Our Location</h3>
                        <p className="text-gray-600">Ghorahi, Nepal · Tulsipur, Nepal</p>
                      </div>
                    </li>

                    <li className="flex">
                      <div className="mt-1 mr-4">
                        <div className="bg-primary-100 p-2 rounded-full text-primary-500">
                          <Phone size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Phone Number</h3>
                        <p className="text-gray-600">(+977) 123-4567</p>
                      </div>
                    </li>

                    <li className="flex">
                      <div className="mt-1 mr-4">
                        <div className="bg-primary-100 p-2 rounded-full text-primary-500">
                          <Mail size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Email Address</h3>
                        <p className="text-gray-600">ranicake50@gamil.com</p>
                      </div>
                    </li>

                    <li className="flex">
                      <div className="mt-1 mr-4">
                        <div className="bg-primary-100 p-2 rounded-full text-primary-500">
                          <Clock size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Operating Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 7am - 6pm</p>
                        <p className="text-gray-600">Saturday - Sunday: 8am - 3pm</p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <h3 className="font-bold text-gray-800 mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-primary-100 p-2 rounded-full text-primary-500 hover:bg-primary-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-primary-100 p-2 rounded-full text-primary-500 hover:bg-primary-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <a href="#" className="bg-primary-100 p-2 rounded-full text-primary-500 hover:bg-primary-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="lg:w-2/3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white p-8 rounded-lg shadow-subtle border border-gray-100">
                  <h2 className="text-2xl font-serif font-bold text-primary-600 mb-6">Send Us a Message</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 p-6 rounded-lg border border-green-200 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-500 mb-4">
                        <Check size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                      <p className="text-green-700 mb-4">
                        Thank you for contacting us. We'll get back to you as soon as possible.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.name ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.subject ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Special Order">Special Order</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Catering Request">Catering Request</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.message ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="How can we help you?"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          icon={<Send size={18} />}
                        >
                          Send Message
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section (placeholder) */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-600 mb-4">Visit Our Bakery</h2>
              <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Come and experience the aroma of freshly baked goods and the warm atmosphere of our bakery.
              </p>
            </motion.div>

            <div className="bg-gray-200 h-96 rounded-lg overflow-hidden shadow-md">
              {/* Map would be embedded here */}
              <div className="w-full h-full flex items-center justify-center bg-primary-100">
                <div className="text-center">
                  <MapPin size={48} className="text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-600 mb-2">Rani Cake</h3>
                  <p className="text-gray-600">Ghorahi, Nepal · Tulsipur, Nepal

                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;