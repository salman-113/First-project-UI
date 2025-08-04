import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-[#6EACDA] font-medium border-b-2 border-[#6EACDA]'
      : 'text-[#E2E2B6] hover:text-[#6EACDA]';
  };



  return (
    <nav className="bg-black text-[#E2E2B6] p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-[#E2E2B6] hover:text-[#6EACDA] transition-colors">
              EchoBay
            </Link>

            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#021526] text-[#E2E2B6] focus:outline-none focus:ring-1 focus:ring-[#E2E2B6] placeholder-[#6EACDA]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors`}>About</Link>
            <Link to="/products" className={`${isActive('/products')} transition-colors`}>Products</Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className="flex items-center hover:text-[#6EACDA] transition-colors"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="mr-1">{user.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-[#021526] rounded-md shadow-lg z-10 text-[#E2E2B6] border border-[#6EACDA]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to="/wishlist"
                      className={`block px-4 py-2 hover:bg-[#6EACDA] hover:text-[#021526] ${isActive('/wishlist')}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/orders"
                      className={`block px-4 py-2 hover:bg-[#6EACDA] hover:text-[#021526] ${isActive('/orders')}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className={`block px-4 py-2 hover:bg-[#6EACDA] hover:text-[#021526] ${isActive('/admin')}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[#6EACDA] hover:text-[#021526]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={`${isActive('/login')} transition-colors`}>Login</Link>
                <Link to="/register" className={`${isActive('/register')} transition-colors`}>Register</Link>
              </>
            )}

            <Link to="/cart" className={`relative ${isActive('/cart')} transition-colors`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6EACDA] text-[#021526] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex justify-between items-center">
          <Link to="/" className={`text-2xl font-bold ${isActive('/')} transition-colors`}>
            EchoBay
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className={`relative ${isActive('/cart')} transition-colors`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6EACDA] text-[#021526] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="hover:text-[#6EACDA] focus:outline-none transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#021526] overflow-hidden mt-4 rounded-lg shadow-lg border border-[#6EACDA]"
          >
            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-[#03346E] text-[#E2E2B6] focus:outline-none focus:ring-2 focus:ring-[#6EACDA] placeholder-[#6EACDA]"
                />
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`py-2 ${isActive('/')}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`py-2 ${isActive('/about')}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/products"
                  className={`py-2 ${isActive('/products')}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/wishlist"
                      className={`py-2 ${isActive('/wishlist')}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/orders"
                      className={`py-2 ${isActive('/orders')}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className={`py-2 ${isActive('/admin')}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left py-2 hover:text-[#6EACDA]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`py-2 ${isActive('/login')}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`py-2 ${isActive('/register')}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;