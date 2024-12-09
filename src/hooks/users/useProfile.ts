import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { User } from '../../services/users/user';

export function useProfile(username: string) {
  const token = localStorage.getItem('token');

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: profileLoading,
    data: profile,
    error: profileError,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () =>
      new User().request({
        path: `/profile/getByUserName/${username}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!username, // Ensure the query only runs if a username is provided
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch profile'),
  });

  if (!username) {
    return {
      isLoading: false,
      profile: null,
      error: null,
    };
  }

  return {
    isLoading: profileLoading,
    error: profileError,
    profile,
  };
}
