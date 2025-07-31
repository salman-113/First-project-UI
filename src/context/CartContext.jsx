import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setCart(user.cart || []);
    } else {
      setCart([]);
    }
    setLoading(false);
  }, [user]);

  const updateCart = async (newCart) => {
    if (!user) {
      toast.error('Please login to manage your cart');
      return false;
    }
    
    try {
      const updatedUser = { ...user, cart: newCart };
      await updateUser(updatedUser);
      setCart(newCart);
      return true;
    } catch (error) {
      toast.error('Failed to update cart');
      return false;
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }
    
    const existingItemIndex = cart.findIndex(item => item.productId === product.id);
    let newCart = [...cart];
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      newCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      newCart.push({
        productId: product.id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0]
      });
    }
    
    return await updateCart(newCart);
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    return await updateCart(newCart);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return false;
    
    const newCart = cart.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    
    return await updateCart(newCart);
  };

  const clearCart = async () => {
    return await updateCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};