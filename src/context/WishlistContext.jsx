import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext'; 

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, updateUser } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setWishlist(user.wishlist || []);
    } else {
      setWishlist([]);
    }
    setLoading(false);
  }, [user]);

  const updateWishlist = async (newWishlist) => {
    if (!user) {
      toast.error('Please login to manage your wishlist');
      return false;
    }

    try {
      const updatedUser = { ...user, wishlist: newWishlist };
      await updateUser(updatedUser);
      setWishlist(newWishlist);
      return true;
    } catch (error) {
      toast.error('Failed to update wishlist');
      return false;
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return false;
    }

    if (wishlist.some(item => item.productId === product.id)) {
      toast.info('Product already in wishlist');
      return false;
    }

    const newWishlist = [
      ...wishlist,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }
    ];

    return await updateWishlist(newWishlist);
  };

  const removeFromWishlist = async (productId) => {
    const newWishlist = wishlist.filter(item => item.productId !== productId);
    return await updateWishlist(newWishlist);
  };

  const moveToCart = async (productId) => {
    const productInWishlist = wishlist.find(item => item.productId === productId);
    if (!productInWishlist) {
      toast.error("Product not found in wishlist");
      return false;
    }

    const newCart = [
      ...cart,
      {
        productId: productInWishlist.productId,
        quantity: 1,
        price: productInWishlist.price,
        name: productInWishlist.name,
        image: productInWishlist.image
      }
    ];
    const newWishlist = wishlist.filter(item => item.productId !== productId);

    const success = await updateUser({ cart: newCart, wishlist: newWishlist });
    if (success) {
      setCart(newCart);
      setWishlist(newWishlist);
      toast.success('Product moved to cart');
      return true;
    }
    return false;
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      loading,
      addToWishlist,
      removeFromWishlist,
      moveToCart
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
