import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Auth } from '@/apis/auth/Auth/Auth.ts';

// Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
  });
  const [session, setSession] = useState(null);
  const [sessions, setSessions] = useState([]); // State for storing sessions
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
      localStorage.removeItem('token');
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch All Sessions
  const listSessions = async () => {
    setIsLoading(true);
    try {
      const response = await new Auth().listSession();

      console.log('API Response:', response); // Log the entire response

      setSessions(response || []);
      return response;
    } catch (err) {
      toast.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', err);
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
      const errorMessage = err.response?.data?.message || 'Failed to login';
      toast.error(errorMessage);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up
  const signup = async ({
    username,
    password,
    email,
    roles,
    firstName,
    lastName,
    gender,
  }) => {
    setIsLoading(true);
    try {
      const createUserDto = {
        userName: username,
        password,
        roles,
        personalInformation: {
          name: {
            first: firstName,
            last: lastName,
          },
          gender,
        },
        contacts: {
          email,
        },
      };

      const response = await new Auth().register(createUserDto); // Use Auth.signup() here

      if (response.token) {
        localStorage.setItem('token', response.token);
        setAuth({ isAuthenticated: true, role: roles, username });
        toast.success('Signup successful!');
        navigate('/home');
        await fetchSession(); // Fetch the updated session after signup
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to signup';
      toast.error(errorMessage);
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
        sessions,
        login,
        signup,
        logout,
        isLoading,
        listSessions,
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
