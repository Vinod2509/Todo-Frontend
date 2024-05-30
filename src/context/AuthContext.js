import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
      axios.get('http://localhost:4000/api/users/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          toast.error('Failed to authenticate user.');
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:4000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
      setUser(res.data.token);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logout successful!');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };