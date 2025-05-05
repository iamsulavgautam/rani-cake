import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Clock, MapPin, Award, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const timelineEvents = [
    {
      year: '',
      title: 'Rani Cake Founded',
      description: 'Our bakery started as a small family business with few cakes in options.',
    },
    {
      year: '',
      title: 'First Expansion',
      description: 'We expanded to a ghorahi, Netralal Chowk and expanded our menu to include artisan pastry and cakes.',
    },
    {
      year: '',
      title: 'Award Recognition',
      description: 'Won "Best Local Bakery" award from the city\'s annual food competition.',
    },
    {
      year: '',
      title: 'Multiple Expansion',
      description: 'We expanded to Butwal ,Manigram.',
    },
    {
      year: '',
      title: 'Community Programs',
      description: 'Launched our baking classes and community donation programs.',
    },

  ];

  const ourValues = [
    {
      icon: <Award className="w-12 h-12 text-accent-500" />,
      title: 'Quality',
      description: 'In rani cake we use only the finest ingredients and traditional techniques to ensure exceptional products.',
    },
    {
      icon: <Heart className="w-12 h-12 text-accent-500" />,
      title: 'Passion',
      description: 'Rani Cake passion for baking drives us to perfect every recipe and create memorable flavors.',
    },
    {
      icon: <MapPin className="w-12 h-12 text-accent-500" />,
      title: 'Community',
      description: 'Rani Cake believe in supporting our local community through sourcing, employment, and giving back.',
    },
    {
      icon: <Clock className="w-12 h-12 text-accent-500" />,
      title: 'Tradition',
      description: 'Rani Cake honor traditional baking methods while embracing innovation for the perfect balance.',
    },
  ];


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

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
              <p className="text-xl mb-0">From humble beginnings to becoming a beloved local bakery, discover the passion behind Sweet Delights.</p>
            </motion.div>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-serif font-bold text-primary-600 mb-4">The Rani Cake Story</h2>
                <div className="w-24 h-1 bg-accent-500 mb-6"></div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Rani Cake is a beloved bakery nestled in the heart of Tulsipur, Nepal, known for its mouthwatering cakes and warm hospitality. It has become a go-to destination for locals looking to celebrate birthdays, anniversaries, and special moments with delicious, freshly baked treats. The bakery stands out for its commitment to quality, using premium ingredients to craft cakes that are not only beautiful in design but also rich in flavor.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Over the years, Rani Cake has earned a strong reputation for its wide variety of offerings, including customized cakes, cupcakes, pastries, and cookies. Whether you're looking for a classic chocolate cake or a themed birthday creation, the skilled bakers at Rani Cake are always ready to deliver with creativity and care. The bakery also keeps up with modern trends, offering photo cakes and unique flavors to suit every customer's taste.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  More than just a bakery, Rani Cake has become a part of the local community in Tulsipur. With its cozy atmosphere and friendly service, it’s a place where people feel welcome and valued. Customers often return not just for the food, but for the experience of joy and celebration that Rani Cake consistently provides. As it continues to grow, Rani Cake remains a shining example of how a small business can make a big impact through passion, dedication, and a love for baking.
                </p>

              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <img
                    src="/img/group5.jpg"
                    alt="Bakery Team"
                    className="rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-primary-600 font-bold">Founded in</p>
                    <p className="text-4xl font-serif font-bold text-accent-500">2010</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-600 mb-4">Our Values</h2>
              <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do at Sweet Delights, from recipe development to customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {ourValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-subtle flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-primary-600 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-600 mb-4">Our Journey</h2>
              <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Follow our story from humble beginnings to becoming a beloved local bakery.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-100"></div>

              {/* Timeline Events */}
              <div className="relative">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 pb-6 md:pb-0">
                      <div className={`bg-primary-50 p-6 rounded-lg shadow-subtle max-w-md ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                        }`}>
                        <div className="text-accent-500 font-bold text-xl mb-1">{event.year}</div>
                        <h3 className="text-xl font-serif font-bold text-primary-600 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>

                    <div className="md:w-1/2 relative flex justify-center">
                      <div className="absolute top-0 left-0 md:left-auto md:right-0 md:transform md:translate-x-1/2 w-10 h-10 bg-primary-500 rounded-full border-4 border-white z-10 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section (can be expanded with actual team members) */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-600 mb-4">Meet Our Team</h2>
              <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                The passionate people behind our delicious creations.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-primary-600 mb-4">Join Our Team</h3>
                <p className="text-gray-600 mb-6">
                  We're always looking for talented, passionate people to join the Sweet Delights family. If you love baking and serving the community, we'd love to hear from you!
                </p>
                <motion.button
                  className="px-6 py-3 bg-primary-500 text-white rounded-md font-medium shadow-sm hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Career Opportunities
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;