import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Practice from '../Practice';

export function useUpdatePractice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedPractice) =>
      Practice.getInstance().update(updatedPractice),
    onSuccess: () => {
      toast.success('Practice updated successfully');
      queryClient.invalidateQueries(['practices']);
    },
    onError: () => {
      toast.error('Failed to update practice');
    },
  });
}
