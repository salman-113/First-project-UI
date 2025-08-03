import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Orders = () => {
  const { user, refreshUser } = useContext(AuthContext);
  // Always try to refresh user when mounting Orders page
  useEffect(() => { refreshUser && refreshUser(); }, []);

  console.log('[Orders.jsx] user.orders:', user?.orders);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
      // If coming from checkout with a new order, show success message
      if (orderId) {
        toast.success('Order placed successfully!');
      }
    }
  }, [user, orderId]);

  if (!user) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#E2E2B6]">Please login to view your orders</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-black [#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
          >
            Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-t-4 border-b-4 border-[#6EACDA] rounded-full"
        ></motion.div>
      </div>
    );
  }

return (
  <div>
    
    <div className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#E2E2B6]">Your Orders</h1>
        
        {(user.orders?.length === 0 || !user.orders) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-[#03346E] rounded-lg shadow-lg border "
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#E2E2B6]">You have no orders yet</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className=" text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div className=" rounded-lg shadow-lg overflow-hidden ">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#021526]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#E2E2B6]">Order ID</th>
                    <th className="px-6 py-4 text-left text-[#E2E2B6]">Date</th>
                    <th className="px-6 py-4 text-left text-[#E2E2B6]">Items</th>
                    <th className="px-6 py-4 text-left text-[#E2E2B6]">Total</th>
                    <th className="px-6 py-4 text-left text-[#E2E2B6]">Status</th>
                    <th className="px-6 py-4 text-left text-[#E2E2B6]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders?.map(order => (
                    <motion.tr 
                      key={order.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#6EACDA]"
                    >
                      <td className="px-6 py-4 text-[#6EACDA]">#{order.id.substring(0, 8)}</td>
                      <td className="px-6 py-4 text-[#E2E2B6]">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-[#E2E2B6]">{order.items.length}</td>
                      <td className="px-6 py-4 text-[#6EACDA]">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'completed' ? 'bg-green-900 text-green-300' :
                          order.status === 'processing' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/orders/details/${order.id}`)}
                          className="text-[#6EACDA] hover:text-[#E2E2B6] transition-colors"
                        >
                          View Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  </div>
);
};

export default Orders;