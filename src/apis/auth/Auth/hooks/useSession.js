import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Auth } from '@/apis/auth/Auth/Auth.ts';

export function useSession() {
  const token = localStorage.getItem('token');

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const auth = new Auth();

  const {
    isLoading: sessionLoading,
    data: session,
    error: sessionError,
  } = useQuery({
    queryKey: ['session'],
    queryFn: () =>
      auth.getSession({
        headers: defaultHeaders,
      }),
    enabled: !!token, // Only fetch session if a token exists
    onError: () => toast.error('Failed to fetch session'),
  });

  if (!token) {
    return {
      isLoading: false,
      session: null,
      error: null,
    };
  }

  return {
    isLoading: sessionLoading,
    session,
    error: sessionError,
  };
}
