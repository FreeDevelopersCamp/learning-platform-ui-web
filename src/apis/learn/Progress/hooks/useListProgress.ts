import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Progress from '../Progress';

export function useListProgress() {
  const {
    isLoading: progressLoading,
    data: progressList,
    error: progressError,
  } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      try {
        return await new Progress().list(); // Ensure `list()` is called properly
      } catch (error) {
        toast.error('Failed to fetch progress data');
        throw error;
      }
    },
    keepPreviousData: true, // Keeps data between queries for a better user experience
  });

  return {
    isLoading: progressLoading,
    error: progressError,
    progressList,
  };
}
