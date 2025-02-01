import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Progress from '../Progress';

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      return new Progress().update(data);
    },
    onSuccess: () => {
      toast.success('Progress updated successfully!');
      queryClient.invalidateQueries(['progress']); // Refresh progress data
    },
    onError: () => {
      toast.error('Failed to update progress');
    },
  });

  return {
    updateProgress: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
