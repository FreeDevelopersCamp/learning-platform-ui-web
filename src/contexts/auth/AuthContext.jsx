import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Auth } from '@/apis/auth/Auth/Auth.ts';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
  });
  const [session, setSession] = useState(null);
  const [sessions, setSessions] = useState([]); // State for storing sessions
  const [isLoading, setIsLoading] = useState(false); // Unified loading state

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the current session
  const fetchSession = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
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
    }
  }, []);

  // Fetch all sessions
  const listSessions = useCallback(async () => {
    try {
      const fetchedSessions = await new Auth().listSession();
      setSessions(fetchedSessions || []);
      return fetchedSessions;
    } catch (err) {
      toast.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', err);
    }
  }, []);

  // Login method
  const login = useCallback(
    async ({ username, password, role }) => {
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
          await fetchSession(); // Fetch session after login
          navigate('/home');
        } else {
          throw new Error('No token received');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to login';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchSession, navigate],
  );

  const signup = useCallback(
    async ({
      username,
      password,
      email,
      roles,
      firstName,
      lastName,
      gender,
    }) => {
      setIsLoading(true);
      console.log(
        username,
        password,
        email,
        roles,
        firstName,
        lastName,
        gender,
      );
      try {
        const requestData = {
          userName: username,
          password,
          roles,
          personalInformation: {
            name: {
              firstName,
              lastName,
            },
            gender: gender,
          },
          contacts: {
            email,
          },
        };

        const response = await new Auth().register(requestData);

        if (response.token) {
          localStorage.setItem('token', response.token);
          setAuth({ isAuthenticated: true, role: roles[0], username });
          toast.success('Registration successful! Redirecting...');
          await fetchSession(); // Fetch session after registration
          navigate('/home');
        } else {
          throw new Error('No token received');
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || 'Registration failed';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchSession, navigate],
  );

  // Logout method
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) await new Auth().logout();

      queryClient.clear();
      localStorage.removeItem('token');
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
      toast.success('You have successfully logged out.');
      navigate('/home');
    } catch (err) {
      toast.error('Logout failed. Please try again.');
    }
  }, [navigate, queryClient]);

  // Initialize session on mount
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const value = useMemo(
    () => ({
      auth,
      session,
      sessions,
      login,
      signup,
      logout,
      isLoading,
      listSessions,
    }),
    [auth, session, sessions, login, logout, isLoading, signup, listSessions],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export { AuthProvider };
