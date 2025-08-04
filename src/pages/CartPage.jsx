import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { 
    cart, 
    loading, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartCount 
  } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="bg-[#021526] min-h-screen flex items-center justify-center">
        <motion.div
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E2E2B6]">
            Your Cart {getCartCount() > 0 && `(${getCartCount()})`}
          </h1>
          {cart.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="text-[#6EACDA] hover:text-[#E2E2B6] transition-colors"
            >
              Clear Cart
            </motion.button>
          )}
        </div>
        
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 rounded-lg shadow-lg border "
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#E2E2B6]">Your cart is empty</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-[#6EACDA] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className=" rounded-lg shadow-lg overflow-hidden border border-[#6EACDA]"
              >
                <div className="hidden md:grid grid-cols-12 bg-[#021526] text-[#E2E2B6] p-4">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-3">Quantity</div>
                  <div className="col-span-2">Total</div>
                </div>
                
                <div className="divide-y divide-[#6EACDA]">
                  {cart.map(item => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4"
                    >
                      <div className="grid grid-cols-12 items-center gap-4">
                        <div className="col-span-5 flex items-center">
                          <Link to={`/products/${item.productId}`} className="flex items-center">
                            <motion.img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded mr-4"
                              whileHover={{ scale: 1.05 }}
                            />
                            <span className="text-[#E2E2B6] hover:text-[#6EACDA] transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        </div>
                        
                        <div className="col-span-2 text-[#6EACDA]">
                          ${item.price.toFixed(2)}
                        </div>
                        
                        <div className="col-span-3">
                          <div className="flex items-center border border-[#6EACDA] rounded-lg w-24 md:w-32">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-3 py-1 bg-[#021526] text-[#E2E2B6] hover:bg-[#6EACDA] hover:text-[#021526] transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </motion.button>
                            <span className="px-2 py-1 text-center flex-1 text-[#E2E2B6]">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-3 py-1 bg-[#021526] text-[#E2E2B6] hover:bg-[#6EACDA] hover:text-[#021526] transition-colors"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="text-[#6EACDA]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-400 hover:text-red-300 transition-colors ml-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className=" rounded-lg shadow-lg p-6 sticky top-4"
              >
                <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-[#E2E2B6]">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#E2E2B6]">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                </div>
                
                <div className="border-t border-[#6EACDA] my-4"></div>
                
                <div className="flex justify-between text-lg font-bold mb-6 text-[#6EACDA]">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="w-full bg-[#6EACDA] text-[#021526] py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors mb-4"
                >
                  Proceed to Checkout
                </motion.button>
                
                <motion.div whileHover={{ x: 5 }}>
                  <Link 
                    to="/products" 
                    className="block text-center text-[#6EACDA] hover:text-[#E2E2B6] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;