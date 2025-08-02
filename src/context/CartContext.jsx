import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setCart(user.cart || []);
    } else {
      setCart([]);
    }
  }, [user]);

  const updateCart = useCallback(async (newCart) => {
    if (!user) {
      toast.error('Please login to manage your cart');
      return false;
    }

    setLoading(true);
    try {
      const updatedUser = { ...user, cart: newCart };
      await updateUser(updatedUser);
      setCart(newCart);
      return true;
    } catch (error) {
      console.error('Cart update error:', error);
      toast.error('Failed to update cart');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, updateUser]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }

    if (quantity < 1) {
      toast.error('Invalid quantity');
      return false;
    }

    const existingItemIndex = cart.findIndex(item => item.productId === product.id);
    const newCart = [...cart];

    if (existingItemIndex >= 0) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({
        productId: product.id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images?.[0] || ''
      });
    }

    const result = await updateCart(newCart);
    return result;
  }, [cart, updateCart, user]);

  const removeFromCart = useCallback(async (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    return await updateCart(newCart);
  }, [cart, updateCart]);

  const updateQuantity = useCallback(async (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error('Quantity must be at least 1');
      return false;
    }

    const newCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    return await updateCart(newCart);
  }, [cart, updateCart]);

  const clearCart = useCallback(async () => {
    return await updateCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      setCart
    }}>
      {children}
    </CartContext.Provider>
  );
};