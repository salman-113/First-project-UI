import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Always fetch latest user from backend
  const refreshUser = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      try {
        const response = await axios.get(`http://localhost:5001/users/${parsedUser.id}`);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        setUser(parsedUser);
      }
    }
  };
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      try {
        const response = await axios.get(`http://localhost:5001/users/${parsedUser.id}`);
        setUser(response.data);
      } catch (error) {
        setUser(parsedUser);
      }
    }
    setLoading(false);
  };
  fetchUser();
}, [user?.orders?.length]);

  const login = async (email, password) => {
    try {
      const response = await axios.get(`http://localhost:5001/users?email=${email}`);
      if (response.data.length === 0) {
        toast.error('User not found');
        return false;
      }

      const userData = response.data[0];
      if (userData.password !== password) {
        toast.error('Invalid credentials');
        return false;
      }

      if (userData.isBlock) {
        toast.error('Your account is blocked');
        return false;
      }

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful');
      return true;
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      // Check if email already exists
      const emailCheck = await axios.get(`http://localhost:5001/users?email=${email}`);
      if (emailCheck.data.length > 0) {
        toast.error('Email already registered');
        return false;
      }

      const newUser = {
        name,
        email,
        password,
        role: 'user',
        isBlock: false,
        cart: [],
        orders: [],
        wishlist: [],
        created_at: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:5001/users', newUser);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      toast.success('Registration successful');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = async (updatedData) => {
    try {
      // Use PUT and send the full user object for json-server compatibility
      const response = await axios.put(`http://localhost:5001/users/${user.id}`, { ...user, ...updatedData });
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return true;
    } catch (error) {
      toast.error('Failed to update user');
      return false;
    }
  };

  const addOrder = async (orderData) => {
    console.log('[addOrder] called with:', orderData);
    try {
      if (!user) {
        toast.error('You must be logged in to place an order');
        return null;
      }

      // Generate a unique ID for the order
      const orderId = `ord_${Date.now()}`;
      const order = {
        id: orderId,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'processing' // Add default status
      };

      // First get the current user data from the database
      const currentUserResponse = await axios.get(`http://localhost:5001/users/${user.id}`);
      const currentUser = currentUserResponse.data;

      // Prepare the updated user data with the new order, ensuring all fields are present
      const updatedUser = {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username || '',
        email: currentUser.email,
        password: currentUser.password,
        role: currentUser.role,
        isBlock: currentUser.isBlock,
        cart: [],
        orders: [...(currentUser.orders || []), order],
        wishlist: currentUser.wishlist || [],
        created_at: currentUser.created_at
      };

      // Update the user in the database
      await axios.put(`http://localhost:5001/users/${user.id}`, updatedUser);
      await refreshUser();

      toast.success('Order placed successfully!');
      return orderId;
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to create order');
      return null;
    }
  };




  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};