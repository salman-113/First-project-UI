import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

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

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Products
        </button>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-4 hover:text-blue-800"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 border-2 rounded ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
            {product.count > 0 ? (
              <span className="ml-4 text-green-600">In Stock</span>
            ) : (
              <span className="ml-4 text-red-600">Out of Stock</span>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="mr-2">Quantity:</span>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-500">Max: {product.count}</span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.count === 0}
              className={`px-6 py-2 rounded-lg font-semibold ${product.count === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              Add to Cart
            </button>
            
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;