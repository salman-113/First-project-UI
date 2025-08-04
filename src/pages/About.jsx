import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Scroll animation setup
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('animate-fadeInUp');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-[#E2E2B6] min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-12 text-center text-[#E2E2B6]">About Our E-Shop</h1>
          
          <section className="mb-16 scroll-animate">
            <div className="bg-[#03346E] rounded-lg shadow-lg p-8 mb-8 transition-all duration-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-[#6EACDA]">Our Story</h2>
              <p className="mb-4">
                Founded in 2023, E-Shop started as a small passion project with a big vision - to make online shopping 
                simple, enjoyable, and accessible to everyone. What began as a modest online store has grown into 
                a trusted e-commerce platform serving thousands of happy customers worldwide.
              </p>
              <p>
                Our journey hasn't always been easy, but our commitment to quality products and exceptional customer 
                service has remained constant. Every day, we strive to improve and bring you the best shopping 
                experience possible.
              </p>
            </div>
          </section>

          <section className="mb-16 scroll-animate">
            <h2 className="text-3xl font-semibold mb-8 text-center text-[#6EACDA]">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#03346E] rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-[#021526] hover:border hover:border-[#6EACDA]"
              >
                <div className="w-16 h-16 bg-[#021526] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#6EACDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#E2E2B6]">Quality Products</h3>
                <p>
                  We carefully curate our selection to offer only the highest quality items from trusted brands.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#03346E] rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-[#021526] hover:border hover:border-[#6EACDA]"
              >
                <div className="w-16 h-16 bg-[#021526] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#6EACDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#E2E2B6]">Secure Shopping</h3>
                <p>
                  Your security is our priority. We use advanced encryption to protect your information.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#03346E] rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-[#021526] hover:border hover:border-[#6EACDA]"
              >
                <div className="w-16 h-16 bg-[#021526] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#6EACDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#E2E2B6]">Fast Delivery</h3>
                <p>
                  We partner with reliable carriers to ensure your orders arrive quickly and safely.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="mb-16 scroll-animate">
            <div className="bg-[#03346E] rounded-lg shadow-lg p-8 transition-all duration-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-[#6EACDA]">Our Mission</h2>
              <p className="mb-4">
                At E-Shop, our mission is to revolutionize online shopping by providing an intuitive platform 
                that connects customers with high-quality products at competitive prices. We believe shopping 
                should be effortless, enjoyable, and accessible to everyone.
              </p>
              <p>
                We're committed to sustainability, ethical sourcing, and giving back to our community. 
                A portion of every purchase goes toward environmental initiatives and local charities.
              </p>
            </div>
          </section>

          <section className="mb-16 scroll-animate">
            <h2 className="text-3xl font-semibold mb-8 text-center text-[#6EACDA]">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-[#03346E] rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#E2E2B6]">Sarah Johnson</h3>
                  <p className="text-[#6EACDA]">CEO & Founder</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-[#03346E] rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#E2E2B6]">Michael Chen</h3>
                  <p className="text-[#6EACDA]">Head of Operations</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-[#03346E] rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#E2E2B6]">Emily Rodriguez</h3>
                  <p className="text-[#6EACDA]">Customer Experience</p>
                </div>
              </motion.div>
            </div>
          </section>

          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center scroll-animate"
          >
            <h2 className="text-3xl font-semibold mb-6 text-[#6EACDA]">Have Questions?</h2>
            <p className="mb-8">
              We'd love to hear from you! Our customer service team is available 24/7 to assist you.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-[#6EACDA] text-[#021526] px-8 py-3 rounded-lg hover:bg-[#03346E] hover:text-[#E2E2B6] font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.section>
        </motion.div>
      </div>

      {/* Add custom CSS for scroll animations */}
      <style jsx>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .animate-fadeInUp {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default About;