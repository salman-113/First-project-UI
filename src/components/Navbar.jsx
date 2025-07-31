import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold mr-4">E-Shop</Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded text-gray-800 w-full md:w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/products" className="hover:text-gray-300">Products</Link>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center hover:text-gray-300"
              >
                <span className="mr-1">{user.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 text-gray-800">
                  <Link 
                    to="/wishlist" 
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
          
          <Link to="/cart" className="flex items-center hover:text-gray-300">
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>({cart.length})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;