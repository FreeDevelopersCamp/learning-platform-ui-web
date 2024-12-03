import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { User } from '../../services/users/user';

export function useUser(username: string) {
  const token = localStorage.getItem('token'); // Or get from `auth` if available

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: userLoading,
    data: user,
    error: userError,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () =>
      new User().request({
        path: `/user/getByUserName/${username}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!username, // Ensure the query only runs if a username is provided
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch user'),
  });

  return {
    isLoading: userLoading,
    error: userError,
    user,
  };
}
