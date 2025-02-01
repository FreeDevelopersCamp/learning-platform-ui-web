import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Practice from '../Practice';

export function useGetPractice(practiceId: string) {
  const {
    isLoading: practiceLoading,
    data: practice,
    error: practiceError,
  } = useQuery({
    queryKey: ['practice', practiceId],
    queryFn: () => Practice.getInstance().getById(practiceId),
    enabled: !!practiceId, // Ensures query runs only if practiceId exists
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch practice'),
  });

  if (!practiceId) {
    return {
      isLoading: false,
      practice: null,
      error: null,
    };
  }

  return {
    isLoading: practiceLoading,
    error: practiceError,
    practice,
  };
}
