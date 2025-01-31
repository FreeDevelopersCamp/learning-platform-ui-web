import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Practice from '../Practice'; // Ensure this points to your API service

export function useCreatePractice() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPractice) => {
      return Practice.getInstance().create(newPractice);
    },
    onSuccess: () => {
      toast.success('Practice created successfully');
      queryClient.invalidateQueries({ queryKey: ['practices'] });
    },
    onError: (error) => {
      console.error('Create Practice Error:', error);
      toast.error('Failed to create practice');
    },
  });

  return {
    isCreating: mutation.isLoading,
    createPractice: mutation.mutate, // ✅ Return the mutate function explicitly
  };
}
