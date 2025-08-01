import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const OrderDetail = () => {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = user?.orders?.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="bg-[#021526] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]">
          <h2 className="text-2xl font-bold mb-6 text-[#E2E2B6]">Order not found</h2>
          <button 
            onClick={() => navigate('/orders')}
            className="bg-[#6EACDA] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6]"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#021526] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/orders')}
            className="flex items-center text-[#6EACDA] hover:text-[#E2E2B6] mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-[#E2E2B6]">Order #{order.id.substring(0, 8)}</h1>
        </div>

        <div className="bg-[#03346E] rounded-lg shadow-lg p-6 mb-6 border border-[#6EACDA]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#E2E2B6]">Order Summary</h2>
              <div className="space-y-2 text-[#E2E2B6]">
                <p><span className="text-[#6EACDA]">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                <p><span className="text-[#6EACDA]">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    order.status === 'completed' ? 'bg-green-900 text-green-300' :
                    order.status === 'processing' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>
                <p><span className="text-[#6EACDA]">Payment Method:</span> {order.paymentMethod}</p>
                <p><span className="text-[#6EACDA]">Total:</span> ${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#E2E2B6]">Shipping Address</h2>
              <div className="space-y-2 text-[#E2E2B6]">
                <p>{order.shippingInfo.address}</p>
                <p>{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#03346E] rounded-lg shadow-lg p-6 border border-[#6EACDA]">
          <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Order Items</h2>
          
          <div className="space-y-4">
            {order.items.map(item => (
              <motion.div 
                key={item.productId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center p-4 bg-[#021526] rounded-lg border border-[#6EACDA]"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#E2E2B6]">{item.name}</h3>
                  <p className="text-[#6EACDA]">${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <div className="text-[#6EACDA] font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-[#6EACDA] my-6"></div>

          <div className="flex justify-between text-lg font-bold text-[#6EACDA]">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetail;