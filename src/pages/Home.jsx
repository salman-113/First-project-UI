import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/Product/ProductCard';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Home = () => {
  const { filteredProducts } = useContext(ProductContext);

  // Slider data
  const slides = [
    {
      id: 1,
      image: "https://www.apple.com/v/airpods-max/i/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_xlarge_2x.jpg",
      title: "Summer Collection 2024",
      subtitle: "Discover the latest trends",
      description: "Up to 30% off on selected items",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      image: "https://www.apple.com/v/airpods-max/i/images/overview/bento/starlight/bento_1_airpod_max_starlight__f7v0k5blkzqm_xlarge_2x.jpg",
      title: "Premium Quality",
      subtitle: "Crafted with perfection",
      description: "Experience unmatched quality and comfort",
      buttonText: "Explore"
    },
    {
      id: 3,
      image: "https://www.apple.com/v/airpods-max/i/images/overview/bento/purple/bento_1_airpod_max_purple__2udwesqoiyq2_xlarge_2x.jpg",
      title: "New Arrivals",
      subtitle: "Fresh from the runway",
      description: "Be the first to own these exclusive pieces",
      buttonText: "View Collection"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Section animation settings
  const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 0.77, 0.47, 0.97] }
  };

  const staggeredAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Slider Section */}
      <section className="mb-12 w-full h-[80vh] max-h-[800px] relative">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              <div className="absolute inset-0 bg-black/30 z-10" />
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-lg text-white"
                  >
                    <motion.p variants={itemVariants} className="text-lg font-medium mb-2">
                      {slide.subtitle}
                    </motion.p>
                    <motion.h1 
                      variants={itemVariants} 
                      className="text-4xl md:text-6xl font-bold mb-4"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl mb-6">
                      {slide.description}
                    </motion.p>
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
                    >
                      {slide.buttonText}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Video Hero Section */}
      <motion.section 
        {...sectionAnimation}
        className="mb-16 w-full rounded-xl overflow-hidden shadow-xl"
      >
        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/spatial-audio/large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.section>

      {/* New Image Section */}
      <motion.section
        {...sectionAnimation}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16 w-full rounded-xl overflow-hidden"
      >
        <div className="relative w-full h-0 pb-[50%]">
          <motion.img
            src="https://www.apple.com/v/airpods-max/i/images/overview/product-stories/hifi-sound/audio_airpod_max__filcqiddcmye_xlarge_2x.jpg"
            alt="Premium Audio Experience"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 0.77, 0.47, 0.97] }}
            viewport={{ once: true, margin: "-100px" }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-8 text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Audio Experience</h2>
              <p className="text-xl mb-6 max-w-2xl mx-auto">
                Immerse yourself in high-fidelity sound with our latest audio technology
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-3 rounded-full font-medium"
              >
                Explore Audio Products
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section 
        {...sectionAnimation}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Featured Products
          </motion.h2>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/products"
            className="text-blue-600 hover:underline"
          >
            View All
          </motion.a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              {...staggeredAnimation}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "backOut"
              }}
              whileHover={{ y: -10 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* New Arrivals Section */}
      <motion.section 
        {...sectionAnimation}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            New Arrivals
          </motion.h2>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/products"
            className="text-blue-600 hover:underline"
          >
            View All
          </motion.a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4)
            .map((product, index) => (
              <motion.div
                key={product.id}
                {...staggeredAnimation}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "backOut"
                }}
                whileHover={{ y: -10 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        {...sectionAnimation}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-16 bg-gradient-to-r from-black-50 to-indigo-50 p-12 rounded-2xl shadow-sm"
      >
        <motion.h2 
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-12 h-12 mx-auto mb-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ),
              title: "Quality Products",
              description: "We source only the highest quality products from trusted suppliers worldwide."
            },
            {
              icon: (
                <svg className="w-12 h-12 mx-auto mb-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Best Prices",
              description: "Competitive pricing without compromising on quality or customer service."
            },
            {
              icon: (
                <svg className="w-12 h-12 mx-auto mb-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
              title: "Fast Shipping",
              description: "Quick and reliable delivery with real-time tracking to your doorstep."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              {...staggeredAnimation}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="inline-block"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        {...sectionAnimation}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-16 bg-gradient-to-r from-black-600 to-[#0A0F2C] text-[#E2E2B6] p-12 rounded-2xl"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 20 }} 
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Stay Updated
          </motion.h2>
          <motion.p 
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-8"
          >
            Subscribe to our newsletter for the latest products and exclusive offers.
          </motion.p>
          <motion.div 
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <motion.input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-full text-gray-900 focus:outline-none"
              whileFocus={{ 
                scale: 1.02,
                boxShadow: "0 0 0 2px rgba(225, 219, 104, 1)"
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;