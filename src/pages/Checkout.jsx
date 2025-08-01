import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'http://localhost:5001/users';

const Checkout = () => {
  const { user, addOrder } = useContext(AuthContext);
  const { cart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

    if (formData.paymentMethod === 'creditCard') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);

    try {
      const order = {
        id: Date.now().toString(),
        userId: user.id,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        total: getCartTotal(),
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await addOrder(order);
      await clearCart();

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#E2E2B6]">Please login to proceed to checkout</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-[#6EACDA] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
          >
            Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#021526] min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#E2E2B6]">Your cart is empty</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="bg-[#6EACDA] text-[#021526] px-6 py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }


return (
    <div className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#E2E2B6]">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <motion.form 
              onSubmit={handleSubmit} 
              className="rounded-lg shadow-lg p-6 mb-6 border border-[#021F44]"
            >
              <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#E2E2B6] mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-[#E2E2B6] mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-[#E2E2B6] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-[#E2E2B6] mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.address ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[#E2E2B6] mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.city ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-[#E2E2B6] mb-2">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.zipCode ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                  />
                  {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Payment Method</h2>
              
              <div className="mb-8 space-y-4">
                <div className="flex items-center p-4 bg-[#021526] rounded-lg border border-[#6EACDA]">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={handleChange}
                    className="mr-4 h-5 w-5 text-[#6EACDA]"
                  />
                  <label htmlFor="creditCard" className="flex-1 text-[#E2E2B6]">Credit Card</label>
                  <div className="flex space-x-2">
                    <FaCcVisa className="text-2xl text-[#E2E2B6]" />
                    <FaCcMastercard className="text-2xl text-[#E2E2B6]" />
                    <FaCcAmex className="text-2xl text-[#E2E2B6]" />
                    <FaCcDiscover className="text-2xl text-[#E2E2B6]" />
                  </div>
                </div>
                
                {formData.paymentMethod === 'creditCard' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#021526] p-4 rounded-lg border border-[#6EACDA] space-y-4"
                  >
                    <div>
                      <label className="block text-[#E2E2B6] mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#E2E2B6] mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.cardExpiry ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                        />
                        {errors.cardExpiry && <p className="text-red-400 text-sm mt-1">{errors.cardExpiry}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-[#E2E2B6] mb-2">CVC</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          className={`w-full px-4 py-2 bg-[#021526] rounded-lg border ${errors.cardCvc ? 'border-red-500' : 'border-[#6EACDA]'} text-[#E2E2B6]`}
                        />
                        {errors.cardCvc && <p className="text-red-400 text-sm mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-center p-4 bg-[#021526] rounded-lg border border-[#6EACDA]">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                    className="mr-4 h-5 w-5 text-[#6EACDA]"
                  />
                  <label htmlFor="paypal" className="flex-1 text-[#E2E2B6]">PayPal</label>
                  <FaPaypal className="text-2xl text-[#E2E2B6]" />
                </div>
                
                <div className="flex items-center p-4 bg-[#021526] rounded-lg border border-[#6EACDA]">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="mr-4 h-5 w-5 text-[#6EACDA]"
                  />
                  <label htmlFor="cash" className="flex-1 text-[#E2E2B6]">Cash on Delivery</label>
                  <FaMoneyBillWave className="text-2xl text-[#E2E2B6]" />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-[#6EACDA]'} text-[#021526] py-3 rounded-lg font-semibold hover:bg-[#E2E2B6] transition-colors`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </motion.button>
            </motion.form>
          </div>
          
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg shadow-lg p-6 border border-[#021F44]"
            >
              <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Order Summary</h2>
              
              <div className="mb-6 space-y-4">
                {cart.map(item => (
                  <div key={item.productId} className="flex justify-between items-center py-3 border-b border-[#6EACDA]">
                    <div>
                      <p className="text-[#E2E2B6]">{item.name}</p>
                      <p className="text-sm text-[#6EACDA]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[#6EACDA]">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-[#6EACDA] my-4"></div>
              
              <div className="flex justify-between font-bold text-lg mb-6 text-[#6EACDA]">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;