import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Auth } from '../../services/auth/Auth';
import { User } from '../../services/users/user';

export function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: loginFunc,
    isLoading: loginLoading,
    error: loginError,
  } = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const auth = new Auth();
      const response = await auth.login({
        userName: username,
        password: password,
      });
      return { token: response.token, username }; // Returning username and token
    },
    {
      onSuccess: async ({ token, username }) => {
        // Destructuring token and username
        if (!token) {
          // If no token is returned, redirect to login page
          toast.error('No token received, redirecting to login.');
          navigate('/auth');
          return;
        }

        toast.success('Login successful!');
        navigate('/home');
      },
      onError: () => {
        toast.error('Failed to login');
        navigate('/auth'); // Redirect to login if login fails
      },
    },
  );

  return { loginFunc, loginLoading, loginError };
}
