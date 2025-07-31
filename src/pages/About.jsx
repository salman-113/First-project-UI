import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">About Our E-Shop</h1>
        
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, E-Shop started as a small passion project with a big vision - to make online shopping 
              simple, enjoyable, and accessible to everyone. What began as a modest online store has grown into 
              a trusted e-commerce platform serving thousands of happy customers worldwide.
            </p>
            <p className="text-gray-700">
              Our journey hasn't always been easy, but our commitment to quality products and exceptional customer 
              service has remained constant. Every day, we strive to improve and bring you the best shopping 
              experience possible.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-700">
                We carefully curate our selection to offer only the highest quality items from trusted brands.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-700">
                Your security is our priority. We use advanced encryption to protect your information.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-700">
                We partner with reliable carriers to ensure your orders arrive quickly and safely.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At E-Shop, our mission is to revolutionize online shopping by providing an intuitive platform 
              that connects customers with high-quality products at competitive prices. We believe shopping 
              should be effortless, enjoyable, and accessible to everyone.
            </p>
            <p className="text-gray-700">
              We're committed to sustainability, ethical sourcing, and giving back to our community. 
              A portion of every purchase goes toward environmental initiatives and local charities.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/women/32.jpg" 
                alt="Team member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/45.jpg" 
                alt="Team member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Michael Chen</h3>
                <p className="text-gray-600">Head of Operations</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="Team member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Emily Rodriguez</h3>
                <p className="text-gray-600">Customer Experience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Our customer service team is available 24/7 to assist you.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;