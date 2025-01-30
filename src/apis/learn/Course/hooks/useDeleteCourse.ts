import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Course from '../Course';

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCourse } = useMutation({
    mutationFn: async (courseId) => {
      const res = await Course.getInstance().delete(courseId);
      return res;
    },
    onSuccess: () => {
      toast.success('Course successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (err) => {
      console.error('Deletion error:', err);
      toast.error('Failed to delete the course');
    },
  });

  return { isDeleting, deleteCourse };
}
