import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Auth } from '../../services/auth/Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setAuth({ isAuthenticated: false, role: null, username: null });
        setIsLoading(false);
        return;
      }

      try {
        const authService = new Auth();
        const session = await authService.request({
          path: '/Auth/session',
          method: 'GET',
          secure: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || 'b_1',
          },
        });

        setAuth({
          isAuthenticated: true,
          role: session.role,
          username: session.username,
        });
      } catch (err) {
        console.error('Failed to fetch session:', err);
        localStorage.removeItem('token');
        setAuth({ isAuthenticated: false, role: null, username: null });
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const logout = async () => {
    try {
      const authService = new Auth();
      const token = localStorage.getItem('token');

      if (token) {
        await authService.request({
          path: '/Auth/logout',
          method: 'POST',
          secure: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
          },
        });
      }

      localStorage.removeItem('token');
      localStorage.removeItem('instructorData');
      setAuth({ isAuthenticated: false, role: null, username: null });
      setIsLoading(false);
      navigate('/home');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to handle logout logic
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const authService = new Auth();
      const token = localStorage.getItem('token');

      if (token) {
        await authService.request({
          path: '/Auth/logout',
          method: 'POST',
          secure: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
          },
        });
      }

      // Clear cache, local storage, and show a success message
      queryClient.clear();
      localStorage.removeItem('token');
      toast.success('You have successfully logged out.');
      navigate('/home');
    } catch (err) {
      console.error('Error during logout:', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  return { logout };
};

// Hook to access authentication context
export const useAuth = () => useContext(AuthContext);
