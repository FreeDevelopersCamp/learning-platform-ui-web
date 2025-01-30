import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Practice from '../Practice'; // Adjust the import based on your Practice service

export function useDeletePractice() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePractice } = useMutation({
    mutationFn: async (practiceId) => {
      // Call the delete method from the Practice service
      const res = await Practice.getInstance().delete(practiceId);
      return res;
    },
    onSuccess: () => {
      toast.success('Practice successfully deleted');
      // Invalidate the 'practices' query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['practices'] });
    },
    onError: (err) => {
      console.error('Deletion error:', err);
      toast.error('Failed to delete the practice');
    },
  });

  return { isDeleting, deletePractice };
}
