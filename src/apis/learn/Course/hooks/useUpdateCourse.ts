import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Course from '../Course';

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCourse } = useMutation({
    mutationFn: async (updatedData) => {
      // Correct parameter structure
      console.log('Updating Course with data:', updatedData);
      return await Course.getInstance().update(updatedData);
    },
    onSuccess: () => {
      toast.success('Course successfully updated');
      queryClient.invalidateQueries({ queryKey: ['courses'] }); // Refetch course list
    },
    onError: (err) => {
      console.error('Update error:', err);
      toast.error('Failed to update the course');
    },
  });

  return { isUpdating, updateCourse };
}
