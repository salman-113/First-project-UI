import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <Link 
            to="/products" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Quantity</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.productId} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover mr-4"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center border rounded w-24">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-center flex-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="border-t my-4"></div>
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
              
              <Link 
                to="/products" 
                className="block text-center mt-4 text-blue-600 hover:text-blue-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;