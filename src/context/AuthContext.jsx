import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.get(`http://localhost:5000/users?email=${email}`);
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
      const emailCheck = await axios.get(`http://localhost:5000/users?email=${email}`);
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
      
      const response = await axios.post('http://localhost:5000/users', newUser);
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
      const response = await axios.patch(`http://localhost:5000/users/${user.id}`, updatedData);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      return true;
    } catch (error) {
      toast.error('Failed to update user');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};