import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Prabesh Ghimire",
    position: "Founder",
    content: "The best baked goods I’ve ever tasted! Fresh, delicious, and always on time.",
    rating: 5,
    image: "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/473551653_604888988953095_7989269014417471424_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFzR_PHsnWilGN_-OReL-ASCzOSUJa4u-cLM5JQlri75-WbcbFmgaFyV63I0uq_d_wrNje5uSELw0efq3xaj_DG&_nc_ohc=xaBOLSBOys0Q7kNvwHLL82F&_nc_oc=AdkxLe_VXito1jepNZxR-QJDEkVLoophKdhlHZizpDxekvsvfbQMZvQuh9mKbCaITZg&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=UBaHszSm5_kEtU1LahWQAQ&oh=00_AfJk_BsHEW8wo_w_vHGftMQtZ_qwIMABcHmGjbxsiZbwGQ&oe=683F2FF0"
  },
  {
    name: "Anamol Gautam",
    position: "CEO",
    content: "Their customer service is top-notch. Highly recommended!",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFVJao7nXUNkw/profile-displayphoto-shrink_200_200/B4DZSEIn0bHkAc-/0/1737383642852?e=1753920000&v=beta&t=H8LrVLnU0WsL1cNiRQ771rfod5thoVvddk2FXrmwD0s"
  },
  {
    name: "Saurav",
    position: "Food Blogger",
    content: "I can't get enough of their cupcakes! Pure bliss in every bite.",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGPx-v9MvEp_g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725327621215?e=1753920000&v=beta&t=g-2BMZZHu7_5pa0YJeHRSKim42aoK6zg5vFJSB1rkgs"
  },

];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0
    })
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${i < rating ? 'text-accent-500 fill-accent-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-600 mb-3">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why our customers keep coming back for more of our delicious baked goods.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            className="absolute -top-10 -left-10 opacity-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Quote size={140} className="text-primary-600" />
          </motion.div>

          <div className="relative overflow-hidden p-6 sm:p-10">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-accent-500 rounded-full p-2">
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Quote size={16} className="text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <div>
                    <h4 className="font-bold text-primary-600 text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    {testimonials[currentIndex].position && (
                      <p className="text-gray-500 text-sm">
                        {testimonials[currentIndex].position}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index < currentIndex ? 'left' : 'right');
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white p-2 rounded-full shadow-md z-10 text-primary-500 hover:text-primary-700 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white p-2 rounded-full shadow-md z-10 text-primary-500 hover:text-primary-700 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
