import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const { 
    cart, 
    loading, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
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
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-t-4 border-b-4 border-[#6EACDA] rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#021526] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#E2E2B6]">Your Cart</h1>
        
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#E2E2B6]">Your cart is empty</h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/products" 
                className="inline-block bg-[#6EACDA] text-[#021526] px-8 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-[#03346E] rounded-lg shadow-lg overflow-hidden border border-[#6EACDA]">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#021526]">
                      <tr>
                        <th className="px-6 py-4 text-left text-[#E2E2B6]">Product</th>
                        <th className="px-6 py-4 text-left text-[#E2E2B6]">Price</th>
                        <th className="px-6 py-4 text-left text-[#E2E2B6]">Quantity</th>
                        <th className="px-6 py-4 text-left text-[#E2E2B6]">Total</th>
                        <th className="px-6 py-4 text-left text-[#E2E2B6]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(item => (
                        <motion.tr 
                          key={item.productId} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-t border-[#6EACDA]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <motion.img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover mr-4 rounded"
                                whileHover={{ scale: 1.05 }}
                              />
                              <span className="text-[#E2E2B6]">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#6EACDA]">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center border border-[#6EACDA] rounded w-24">
                              <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="px-2 py-1 bg-[#021526] text-[#E2E2B6] hover:bg-[#6EACDA] hover:text-[#021526] transition-colors"
                              >
                                -
                              </motion.button>
                              <span className="px-2 py-1 text-center flex-1 text-[#E2E2B6]">{item.quantity}</span>
                              <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="px-2 py-1 bg-[#021526] text-[#E2E2B6] hover:bg-[#6EACDA] hover:text-[#021526] transition-colors"
                              >
                                +
                              </motion.button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#6EACDA]">${(item.price * item.quantity).toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Remove
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCart}
                  className="text-[#6EACDA] hover:text-[#E2E2B6] transition-colors"
                >
                  Clear Cart
                </motion.button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#03346E] rounded-lg shadow-lg p-6 border border-[#6EACDA]"
              >
                <h2 className="text-xl font-semibold mb-4 text-[#E2E2B6]">Order Summary</h2>
                
                <div className="flex justify-between mb-3 text-[#E2E2B6]">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-3 text-[#E2E2B6]">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                
                <div className="border-t border-[#6EACDA] my-4"></div>
                
                <div className="flex justify-between font-bold text-lg mb-6 text-[#6EACDA]">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="w-full bg-[#6EACDA] text-[#021526] py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
                >
                  Proceed to Checkout
                </motion.button>
                
                <motion.div whileHover={{ x: 5 }} className="mt-4">
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

export default CartPage;