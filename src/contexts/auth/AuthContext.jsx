import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Auth } from '../../apis/auth/Auth/Auth.ts';

// Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
  });
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Session
  const fetchSession = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
      setIsLoading(false);
      return;
    }

    try {
      const fetchedSession = await new Auth().getSession();

      setAuth({
        isAuthenticated: true,
        role: fetchedSession.role,
        username: fetchedSession.username,
      });
      setSession(fetchedSession);
    } catch (err) {
      console.error('Failed to fetch session:', err);
      localStorage.removeItem('token');
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async ({ username, password, role }) => {
    setIsLoading(true);
    try {
      const response = await new Auth().login({
        userName: username,
        password,
        role,
      });

      if (response.token) {
        localStorage.setItem('token', response.token);
        setAuth({ isAuthenticated: true, role, username });
        toast.success('Login successful!');
        navigate('/home');
        await fetchSession(); // Fetch the updated session after login
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Failed to login');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        await new Auth().logout();
      }

      queryClient.clear();
      localStorage.removeItem('token');
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
      toast.success('You have successfully logged out.');
      navigate('/home');
    } catch (err) {
      console.error('Error during logout:', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        session,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for simplicity
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider };
