import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const { updateCart } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || isUpdating) return;
    
    setIsUpdating(true);
    const previousQuantity = quantity;
    setQuantity(newQuantity);

    try {
      const currentCart = [...user.cart];
      
      const updatedCart = currentCart.map(cartItem => 
        cartItem.productId === item.productId 
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );

      const success = await updateCart(updatedCart);
      
      if (!success) {
        setQuantity(previousQuantity);
        toast.error('Failed to update quantity');
      }
    } catch (error) {
      setQuantity(previousQuantity);
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const currentCart = [...user.cart].filter(
        cartItem => cartItem.productId !== item.productId
      );
      const success = await updateCart(currentCart);
      
      if (success) {
        toast.success('Item removed from cart');
      } else {
        toast.error('Failed to remove item');
      }
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
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
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end sm:space-x-8 mt-4 sm:mt-0">
        <div className="flex items-center border rounded">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleQuantityChange(quantity - 1);
            }}
            disabled={isUpdating || quantity <= 1}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            -
          </button>
          <span className="px-3 py-1 text-center w-12">
            {isUpdating ? '...' : quantity}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleQuantityChange(quantity + 1);
            }}
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
          disabled={isUpdating}
          className="ml-4 text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;