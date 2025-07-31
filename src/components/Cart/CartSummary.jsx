import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const CartSummary = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/checkout');
  };

  const handleClearCart = async () => {
    if (cart.length === 0) return;
    
    const success = await clearCart();
    if (success) {
      toast.success('Cart cleared successfully');
    } else {
      toast.error('Failed to clear cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        
        <div className="flex justify-between border-t border-gray-200 pt-3">
          <span className="text-gray-600">Tax</span>
          <span>Calculated at checkout</span>
        </div>
        
        <div className="flex justify-between border-t border-gray-200 pt-3 font-medium text-lg">
          <span>Estimated Total</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        Proceed to Checkout
      </button>
      
      {cart.length > 0 && (
        <button
          onClick={handleClearCart}
          className="w-full mt-3 py-2 px-4 rounded-md font-medium text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800"
        >
          Clear Cart
        </button>
      )}
      
      <div className="mt-4 text-center">
        <Link 
          to="/products" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Continue Shopping
        </Link>
      </div>
      
      {!user && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-md text-yellow-700 text-sm">
          <p>You're shopping as a guest. <Link to="/login" className="font-medium hover:underline">Login</Link> to save your cart.</p>
        </div>
      )}
    </div>
  );
};

export default CartSummary;