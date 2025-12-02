import { createContext, useState, useEffect } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      console.log('=== REGISTRATION STARTED ===');
      console.log('User data:', { ...userData, password: '***' });
      console.log('API URL:', import.meta.env.VITE_API_URL);
      
      const { data } = await API.post('/auth/register', userData);
      
      console.log('=== REGISTRATION SUCCESS ===');
      console.log('Response:', data);
      
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error('=== REGISTRATION FAILED ===');
      console.error('Error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      console.log('=== LOGIN STARTED ===');
      const { data } = await API.post('/auth/login', credentials);
      console.log('=== LOGIN SUCCESS ===');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error('=== LOGIN FAILED ===');
      console.error('Error:', error.response?.data);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
