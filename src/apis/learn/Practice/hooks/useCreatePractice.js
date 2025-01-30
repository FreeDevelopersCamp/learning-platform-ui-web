import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Practice from '../Practice';

export function useCreatePractice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPractice) => Practice.getInstance().create(newPractice),
    onSuccess: () => {
      toast.success('Practice created successfully');
      queryClient.invalidateQueries(['practices']);
    },
    onError: () => {
      toast.error('Failed to create practice');
    },
  });
}
