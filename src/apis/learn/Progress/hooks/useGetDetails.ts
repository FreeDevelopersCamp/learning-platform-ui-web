import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Progress from '../Progress';

export function useGetDetails(id: string) {
  const {
    isLoading: progressLoading,
    data: progress,
    error: progressError,
  } = useQuery({
    queryKey: ['progress', id],
    queryFn: () => new Progress().getDetails(id),
    enabled: !!id, // Ensures the query only runs if a userId is provided
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch progress'),
  });

  if (!id) {
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
