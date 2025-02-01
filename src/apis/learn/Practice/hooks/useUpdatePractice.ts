import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Practice from '../Practice'; // Ensure this is your API service

export function useUpdatePractice() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedPractice) => {
      return Practice.getInstance().update(updatedPractice);
    },
    onSuccess: () => {
      toast.success('Practice updated successfully');
      queryClient.invalidateQueries({ queryKey: ['practices'] });
    },
    onError: (error) => {
      console.error('Update Practice Error:', error);
      toast.error('Failed to update practice');
    },
  });

  return {
    isUpdating: mutation.isLoading,
    updatePractice: mutation.mutate, // ✅ Explicitly return the function
  };
}
