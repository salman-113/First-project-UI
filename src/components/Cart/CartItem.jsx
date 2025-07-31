import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    setIsUpdating(true);
    
    // Debounce the quantity update to avoid too many API calls
    const timer = setTimeout(async () => {
      const success = await updateQuantity(item.productId, newQuantity);
      setIsUpdating(false);
      if (!success) {
        setQuantity(item.quantity); // Revert if update failed
        toast.error('Failed to update quantity');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  };

  const handleRemove = async () => {
    const success = await removeFromCart(item.productId);
    if (success) {
      toast.success('Item removed from cart');
    } else {
      toast.error('Failed to remove item');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
      {/* Product Image and Info */}
      <div className="flex flex-1 items-start space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-gray-500">${item.price.toFixed(2)}</p>
          
          {/* Mobile quantity controls */}
          <div className="sm:hidden mt-2">
            <div className="flex items-center border rounded w-24">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isUpdating}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                -
              </button>
              <span className="px-2 py-1 text-center flex-1">
                {isUpdating ? '...' : quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop quantity controls and price */}
      <div className="flex items-center justify-between sm:justify-end sm:space-x-8 mt-4 sm:mt-0">
        <div className="hidden sm:flex items-center border rounded">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={isUpdating}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            -
          </button>
          <span className="px-3 py-1 text-center w-12">
            {isUpdating ? '...' : quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={isUpdating}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            +
          </button>
        </div>
        
        <div className="text-lg font-medium text-gray-900 min-w-[80px] text-right">
          ${(item.price * quantity).toFixed(2)}
        </div>
        
        <button
          onClick={handleRemove}
          className="ml-4 text-red-500 hover:text-red-700"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;