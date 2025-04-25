import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Ramesh Bahadur",
    position: "Founder",
    content: "The best baked goods I’ve ever tasted! Fresh, delicious, and always on time.",
    rating: 5,
    image: "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/480581208_571333252589207_440255246789462852_n.jpg?stp=c0.79.720.720a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=prVGqDLIsLEQ7kNvwGm2UlM&_nc_oc=AdkhH062hcK-GiHHsmurBIVFGYynSpvdv5OMmxqqK3i1GfjWxRaNT-t-lx5njmgwuxY&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=jYxSS6gqypadHWly2P0PNg&oh=00_AfFbfjMJIuVSUJJDrZqYSZcYUiZOq7N0i_SykottPOVPiA&oe=681139A8"
  },
  {
    name: "Alex BK",
    position: "CEO",
    content: "Their customer service is top-notch. Highly recommended!",
    rating: 4.5,
    image: "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/484834409_586886797700519_5206476814459663091_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=S40WLJJmF00Q7kNvwHcvsCc&_nc_oc=AdkfcRhtYAcnQZ5J1HyREMWxRAsRxDSOIVIsmANWht8H-H1jzxQHWCZKSlBeJkwOr3Q&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=A2GPBRmCLwR0NSDx8_1ibw&oh=00_AfHMvqgRyM3bDnTc8WEh76iQh9efwWpjXCqAjo1lbce9hg&oe=68114370"
  },
  {
    name: "Saurav",
    position: "Food Blogger",
    content: "I can't get enough of their cupcakes! Pure bliss in every bite.",
    rating: 5,
    image: "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/484670012_671826468741662_9219591596783802061_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=9Oa5BzPfHBcQ7kNvwHNjla2&_nc_oc=AdmG9RHc9YRAI6rgU77IbBDFVNwTq5dYVQJLdeAU1NI-HnANfSrCYZhaR4kePOruSAU&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=3rHGLwEAOhfLuw9klAZUIw&oh=00_AfGct_M-1YEhYGr480ncufIvczei67a4Z2wquHGJ2PjYzQ&oe=68113CAC"
  },
  {
    name: "Dinesh Kafle",
    position: "Founder and CEO",
    content: "Perfect for events—reliable, tasty, and beautifully packaged.",
    rating: 5,
    image: "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/481077413_569035742818958_653514518851406894_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GVkQdWzq6IEQ7kNvwEtTtHp&_nc_oc=Admp3jfc0xKIt4s2_2BFZpeqJcSNTYEOTyzd71g0V8xBvfB45rm10wuIbf9raEFDqmU&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=ZvBE63mz7R76SYK8gpjGDQ&oh=00_AfGTH3fJatkqxXQ4dQTTTicRCvgB8rwsGlDhqLQFvp0RHg&oe=68114C07"
  }
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
