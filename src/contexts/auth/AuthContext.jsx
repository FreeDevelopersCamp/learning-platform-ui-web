import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
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
    setIsLoading(true);
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
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('instructorData');
      setAuth({ isAuthenticated: false, role: null, username: null });
      setIsLoading(false);
      navigate('/home');
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
