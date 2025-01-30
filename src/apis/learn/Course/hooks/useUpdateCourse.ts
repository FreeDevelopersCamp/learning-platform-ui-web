import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Course from '../Course';

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCourse } = useMutation({
    mutationFn: async ({ updatedData }: { updatedData: any }) => {
      // Use the Course service instance to update the course
      return await Course.getInstance().update(updatedData);
    },
    onSuccess: () => {
      toast.success('Course successfully updated');
      // Invalidate the courses query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (err) => {
      console.error('Update error:', err);
      toast.error('Failed to update the course');
    },
  });

  return { isUpdating, updateCourse };
}
