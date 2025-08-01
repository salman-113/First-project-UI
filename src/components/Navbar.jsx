import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
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

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'text-[#E2E2B6] font-medium' : 'text-[#03346E] hover:text-[#6EACDA]';
  };

  return (
    <nav className="bg-black text-[#E2E2B6] p-4 shadow-lg">
      <div className="container mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className={`text-2xl font-bold mr-6 ${isActive('/')} transition-colors`}>
             EchoBay
            </Link>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded text-[#E2E2B6] focus:outline-none focus:ring-1 focus:ring-[#E2E2B6]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
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
                  className="flex items-center text-[#E2E2B6] hover:text-[#6EACDA] transition-colors"
                >
                  <span className="mr-1">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#E2E2B6] rounded-md shadow-lg z-10 text-[#021526] border border-[#03346E]">
                    <Link 
                      to="/wishlist" 
                      className={`block px-4 py-2 hover:bg-[#6EACDA] hover:text-[#E2E2B6] ${isActive('/wishlist')}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <Link 
                      to="/orders" 
                      className={`block px-4 py-2 hover:bg-[#6EACDA] hover:text-[#E2E2B6] ${isActive('/orders')}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className={`block px-4 py-2 hover:bg-[#6EACDA] hover:text-[#E2E2B6] ${isActive('/admin')}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[#6EACDA] hover:text-[#E2E2B6] text-[#03346E]"
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
            E-Shop
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
              className="text-[#E2E2B6] hover:text-[#6EACDA] focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#03346E] mt-4 p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
              />
            </div>
            
            <div className="flex flex-col space-y-3 text-[#E2E2B6]">
              <Link 
                to="/" 
                className={`${isActive('/')} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`${isActive('/about')} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/products" 
                className={`${isActive('/products')} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/wishlist" 
                    className={`${isActive('/wishlist')} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link 
                    to="/orders" 
                    className={`${isActive('/orders')} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className={`${isActive('/admin')} transition-colors`}
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
                    className="text-left hover:text-[#6EACDA] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`${isActive('/login')} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`${isActive('/register')} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;