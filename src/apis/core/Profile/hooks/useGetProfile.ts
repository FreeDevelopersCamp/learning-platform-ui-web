import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Profile } from '../Profile';

export function useGetProfile(username: string) {
  const {
    isLoading: profileLoading,
    data: profile,
    error: profileError,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => new Profile().getByUserName(username),
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
