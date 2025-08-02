import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some(item => item.productId === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product);
    toast.success('Product added to cart');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to manage wishlist');
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Product removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Product added to wishlist');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0A0F2C] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border hover:border-[#6EACDA]"
    >
      <Link to={`/products/${product.id}`} className="block">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-fullobject-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <motion.h3
            whileHover={{ color: '#10191fff' }}
            className="text-lg font-semibold mb-2 text-[#E2E2B6]"
          >
            {product.name}
          </motion.h3>
        </Link>

        <div className="flex justify-between items-center mb-3">
          <span className="text-[#6EACDA] font-bold">${product.price.toFixed(2)}</span>
          {product.count > 0 ? (
            <span className="text-green-400 text-sm">In Stock</span>
          ) : (
            <span className="text-red-400 text-sm">Out of Stock</span>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.count === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${product.count === 0
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#6EACDA] text-[#021526] hover:bg-[#E2E2B6]'
              }`}
          >
            Add to Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`p-2 rounded-full transition-colors ${isInWishlist
                ? 'text-red-500 bg-[#021526]'
                : 'text-[#E2E2B6] bg-[#021526] hover:text-red-500'
              }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;