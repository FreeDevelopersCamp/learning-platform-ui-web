import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { User } from '../User';

export function useGetUser(username: string) {
  const {
    isLoading: userLoading,
    data: user,
    error: userError,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => new User().getByUserName(username),
    enabled: !!username, // Ensure the query only runs if a username is provided
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch user'),
  });

  if (!username) {
    return {
      isLoading: false,
      user: null,
      error: null,
    };
  }

  return {
    isLoading: userLoading,
    error: userError,
    user,
  };
}
