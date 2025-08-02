import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { wishlist, loading, removeFromWishlist, moveToCart } = useContext(WishlistContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const handleMoveToCart = async (productId) => {
    const success = await moveToCart(productId, cartContext);
    if (success) {
      toast.success('Product moved to cart');
    }
  };

  if (!user) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#E2E2B6]">Please login to view your wishlist</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-[#6EACDA] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
          >
            Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-t-4 border-b-4 border-[#6EACDA] rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#E2E2B6]">Your Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16  rounded-lg shadow-lg "
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#E2E2B6]">Your wishlist is empty</h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/products" 
                className="inline-block bg-[#6EACDA] text-[#021526] px-8 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
              >
                Browse Products
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map(item => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -5 }}
                className="bg-[#03346E] rounded-lg shadow-lg overflow-hidden border border-[#6EACDA] hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/products/${item.productId}`} className="block">
                  <motion.img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-56 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                
                <div className="p-5">
                  <Link to={`/products/${item.productId}`} className="block">
                    <motion.h3 
                      className="text-lg font-semibold mb-3 text-[#E2E2B6] hover:text-[#6EACDA] transition-colors"
                      whileHover={{ color: '#6EACDA' }}
                    >
                      {item.name}
                    </motion.h3>
                  </Link>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-[#6EACDA]">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoveToCart(item.productId)}
                      className="px-4 py-2 bg-[#6EACDA] text-[#021526] rounded-lg font-medium hover:bg-[#E2E2B6] transition-colors"
                    >
                      Add to Cart
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(item.productId)}
                      className="p-2 text-red-500 hover:text-red-400 bg-[#021526] rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Wishlist;