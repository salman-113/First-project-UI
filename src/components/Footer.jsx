const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Shop</h3>
            <p>Your one-stop shop for all your needs. Quality products at affordable prices.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/products" className="hover:text-gray-300">Products</a></li>
              <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address>
              <p>123 Shop Street</p>
              <p>Retail City, RC 12345</p>
              <p>Email: info@eshop.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;