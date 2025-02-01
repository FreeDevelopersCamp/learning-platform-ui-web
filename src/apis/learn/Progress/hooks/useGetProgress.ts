import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Progress from '../Progress';

export function useGetProgress(userId: string) {
  const {
    isLoading: progressLoading,
    data: progress,
    error: progressError,
  } = useQuery({
    queryKey: ['progress', userId],
    queryFn: () => new Progress().getByUserId(userId),
    enabled: !!userId, // Ensures the query only runs if a userId is provided
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch progress'),
  });

  if (!userId) {
    return {
      isLoading: false,
      progress: null,
      error: null,
    };
  }

  return {
    isLoading: progressLoading,
    error: progressError,
    progress,
  };
}
