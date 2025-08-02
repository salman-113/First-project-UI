import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="bg-[#021526] min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#E2E2B6]">Product not found</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="bg-[#6EACDA] text-[#021526] px-6 py-2 rounded-lg font-semibold hover:bg-[#03346E] hover:text-[#E2E2B6] transition-colors"
          >
            Back to Products
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.productId === product.id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    addToCart(product, quantity);
    toast.success('Product added to cart');
  };

  const handleWishlist = () => {
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

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6EACDA]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-[#E2E2B6] min-h-screen py-8"
    >
      <div className="container mx-auto px-4">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-[#6EACDA] mb-6 hover:text-[#E2E2B6] transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </motion.button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <div className="bg-[#03346E] p-3 rounded-lg shadow-lg mb-4">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-110 object-contain"
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto py-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 border-2 rounded overflow-hidden ${selectedImage === index ? 'border-[#6EACDA]' : 'border-[#021526]'}`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-4 text-[#E2E2B6]">{product.name}</h1>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-[#6EACDA]">${product.price.toFixed(2)}</span>
              {product.count > 0 ? (
                <span className="ml-4 text-green-400">In Stock</span>
              ) : (
                <span className="ml-4 text-red-400">Out of Stock</span>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-[#6EACDA]">Description</h2>
              <p className="text-[#E2E2B6]">{product.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-[#6EACDA]">Category</h2>
              <span className="inline-block bg-[#03346E] rounded-full px-4 py-1 text-sm font-semibold text-[#6EACDA]">
                {product.category}
              </span>
            </div>
            
            <div className="flex items-center mb-8">
              <span className="mr-3">Quantity:</span>
              <div className="flex items-center border border-[#6EACDA] rounded">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-[#03346E] hover:bg-[#6EACDA] hover:text-[#021526] transition-colors"
                >
                  -
                </motion.button>
                <span className="px-4 py-1">{quantity}</span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 bg-[#03346E] hover:bg-[#6EACDA] hover:text-[#021526] transition-colors"
                >
                  +
                </motion.button>
              </div>
              <span className="ml-4 text-sm text-[#6EACDA]">Max: {product.count}</span>
            </div>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.count === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  product.count === 0 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#6EACDA] text-[#021526] hover:bg-[#03346E] hover:text-[#E2E2B6]'
                }`}
              >
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                className={`p-3 rounded-full transition-colors ${
                  isInWishlist 
                    ? 'text-red-500 bg-[#03346E]' 
                    : 'text-[#6EACDA] bg-[#03346E] hover:text-red-500'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;