import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  
  const isInWishlist = wishlist.some(item => item.productId === product.id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product);
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
          {product.count > 0 ? (
            <span className="text-green-600 text-sm">In Stock</span>
          ) : (
            <span className="text-red-600 text-sm">Out of Stock</span>
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.count === 0}
            className={`px-3 py-1 rounded ${product.count === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            Add to Cart
          </button>
          
          <button
            onClick={handleWishlist}
            className={`p-1 rounded-full ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;