import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Auth } from '../../services/auth/Auth';

export function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: loginFunc,
    isLoading: loginLoading,
    error: loginError,
  } = useMutation(
    async ({
      username,
      password,
      role,
    }: {
      username: string;
      password: string;
      role: string;
    }) => {
      const auth = new Auth();
      const response = await auth.login({
        userName: username,
        password: password,
        role,
      });
      return { token: response.token, username }; // Returning username and token
    },
    {
      onSuccess: async ({ token }) => {
        // Destructuring token and username
        if (!token) {
          // If no token is returned, redirect to login page
          toast.error('No token received, redirecting to login.');
          navigate('/login');
          return;
        }

        toast.success('Login successful!');
        localStorage.setItem('token', token);
        navigate('/home');
      },
      onError: () => {
        toast.error('Failed to login');
        navigate('/login'); // Redirect to login if login fails
      },
    },
  );

  return { loginFunc, loginLoading, loginError };
}
