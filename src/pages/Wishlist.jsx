import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { wishlist, loading, removeFromWishlist, moveToCart } = useContext(WishlistContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const handleMoveToCart = async (productId) => {
    const success = await moveToCart(productId, cartContext);
    if (success) {
      toast.success('Product moved to cart');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your wishlist</h2>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your wishlist is empty</h2>
          <Link 
            to="/products" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div key={item.productId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/products/${item.productId}`} className="block">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/products/${item.productId}`} className="block">
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">{item.name}</h3>
                </Link>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-800 font-bold">${item.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => handleMoveToCart(item.productId)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;