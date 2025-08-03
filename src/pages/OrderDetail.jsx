import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const OrderStatusBadge = ({ status }) => {
  const statusMap = {
    completed: { bg: 'bg-green-900', text: 'text-green-300' },
    processing: { bg: 'bg-yellow-900', text: 'text-yellow-300' },
    cancelled: { bg: 'bg-red-900', text: 'text-red-300' },
    shipped: { bg: 'bg-blue-900', text: 'text-blue-300' }
  };

  const { bg, text } = statusMap[status] || { bg: 'bg-gray-900', text: 'text-gray-300' };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
      {status?.charAt(0)?.toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
};

const OrderDetail = () => {
  const { user, authLoading, refreshUser } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const loadOrderDetails = async () => {
      try {
        // Wait for auth to initialize
        if (authLoading) return;

        // If no user but auth is done loading
        if (!user) {
          if (isMounted) {
            setError('Please login to view order details');
            setLoading(false);
          }
          return;
        }

        // Get fresh user data
        const updatedUser = await refreshUser();
        if (!isMounted) return;

        if (!updatedUser?.orders?.length) {
          if (isMounted) {
            setError('No orders found in your account');
            setLoading(false);
          }
          return;
        }

        // Find the specific order
        const foundOrder = updatedUser.orders.find(o => o.id === orderId);
        if (!foundOrder) {
          if (isMounted) {
            setError(`Order #${orderId?.substring(0, 8)} not found`);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setOrder(foundOrder);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading order:', err);
        if (isMounted) {
          setError('Failed to load order details. Please try again.');
          setLoading(false);
        }
      }
    };

    loadOrderDetails();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [orderId, authLoading]); // Removed user and refreshUser from dependencies

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date not available';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-t-4 border-b-4 border-[#6EACDA] rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA] max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#E2E2B6]">{error}</h2>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/orders')}
              className="bg-[#6EACDA] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6]"
            >
              Back to Orders
            </motion.button>
            {!user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-[#E2E2B6] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#6EACDA]"
              >
                Login
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orders')}
            className="flex items-center text-[#6EACDA] hover:text-[#E2E2B6]"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Orders
          </motion.button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#E2E2B6]">
            Order #{order.id?.substring(0, 8) || ''}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#03346E] rounded-lg shadow-lg p-6 border border-[#6EACDA]"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#E2E2B6]">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-[#E2E2B6]">
                <p><span className="text-[#6EACDA]">Order Date:</span> {formatDate(order.createdAt)}</p>
                <p className="flex items-center">
                  <span className="text-[#6EACDA] mr-2">Status:</span>
                  <OrderStatusBadge status={order.status} />
                </p>
              </div>
              <div className="space-y-2 text-[#E2E2B6]">
                <p><span className="text-[#6EACDA]">Payment Method:</span> {order.paymentMethod || 'Not specified'}</p>
                <p><span className="text-[#6EACDA]">Total Amount:</span> ${order.total?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </motion.div>

          {/* Shipping Information */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg- rounded-lg shadow-lg p-6 border border-[#6EACDA]"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#E2E2B6]">Shipping Information</h2>
            <div className="space-y-2 text-[#E2E2B6]">
              <p><span className="text-[#6EACDA]">Name:</span> {order.shippingInfo?.name || 'Not specified'}</p>
              <p><span className="text-[#6EACDA]">Address:</span> {order.shippingInfo?.address || 'Not specified'}</p>
              <p>
                <span className="text-[#6EACDA]">City/State/Zip:</span> 
                {` ${order.shippingInfo?.city || ''}, ${order.shippingInfo?.state || ''} ${order.shippingInfo?.zipCode || ''}`}
              </p>
              <p><span className="text-[#6EACDA]">Country:</span> {order.shippingInfo?.country || 'Not specified'}</p>
              <p><span className="text-[#6EACDA]">Phone:</span> {order.shippingInfo?.phone || 'Not specified'}</p>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg- rounded-lg shadow-lg p-6 border border-[#6EACDA]"
          >
            <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Order Items</h2>
            
            <div className="space-y-4">
              {order.items?.map(item => (
                <motion.div 
                  key={item.productId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-[#021526] rounded-lg border border-[#6EACDA] gap-4"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/64';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-[#E2E2B6] truncate">{item.name}</h3>
                    <p className="text-[#6EACDA]">${item.price?.toFixed(2) || '0.00'} × {item.quantity || 1}</p>
                  </div>
                  <div className="text-[#6EACDA] font-medium">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#6EACDA] my-6"></div>

            <div className="flex justify-between text-lg font-bold text-[#6EACDA]">
              <span>Total</span>
              <span>${order.total?.toFixed(2) || '0.00'}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetail;