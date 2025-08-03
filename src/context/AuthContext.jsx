import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Memoized refresh function
  const refreshUser = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;

      const parsedUser = JSON.parse(storedUser);
      const response = await axios.get(`http://localhost:5001/users/${parsedUser.id}`);
      
      // Update state and localStorage
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing user:', error);
      return null;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const response = await axios.get(`http://localhost:5001/users/${parsedUser.id}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Fallback to stored user if backend fails
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } finally {
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Dedicated cart functions to avoid unnecessary toasts
  const updateCart = async (updatedCart) => {
    try {
      if (!user) return false;
      
      await axios.patch(`http://localhost:5001/users/${user.id}`, {
        cart: updatedCart
      });
      await refreshUser();
      return true;
    } catch (error) {
      console.error('Cart update failed:', error);
      return false;
    }
  };

  const addToCart = async (product) => {
    try {
      if (!user) {
        toast.error('Please login to add items to cart');
        return false;
      }

      const updatedCart = [...user.cart, product];
      const success = await updateCart(updatedCart);
      
      if (success) {
        toast.success(`${product.name} added to cart`);
      }
      return success;
    } catch (error) {
      toast.error('Failed to add item to cart');
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
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
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setAuthLoading(true);
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
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = async (updatedData) => {
    try {
      setAuthLoading(true);
      const response = await axios.put(
        `http://localhost:5001/users/${user.id}`, 
        { ...user, ...updatedData }
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const addOrder = async (orderData) => {
    try {
      setOrdersLoading(true);
      if (!user) {
        toast.error('You must be logged in to place an order');
        return null;
      }

      const orderId = `ord_${Date.now()}`;
      const order = {
        id: orderId,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'processing'
      };

      const updatedUser = {
        ...user,
        cart: [],
        orders: [...(user.orders || []), order]
      };

      await axios.put(`http://localhost:5001/users/${user.id}`, updatedUser);
      await refreshUser();

      toast.success('Order placed successfully!');
      return orderId;
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to create order');
      return null;
    } finally {
      setOrdersLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      authLoading,
      ordersLoading,
      login, 
      register, 
      logout, 
      updateUser,
      updateCart,
      addToCart,
      addOrder,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};