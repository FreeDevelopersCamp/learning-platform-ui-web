import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Progress from '../Progress';

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedProgress) => {
      console.log('Updating Progress:', updatedProgress);
      const response = await new Progress().update(updatedProgress);

      console.log('API Response:', response);

      if (!response || response.error) {
        throw new Error('Failed to update progress');
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Progress updated successfully!');
      queryClient.invalidateQueries(['progress']);
    },
    onError: (error) => {
      console.error('Update Progress Error:', error);
      toast.error('Failed to update progress');
    },
  });

  return { updateProgress: mutate, isUpdating };
}
