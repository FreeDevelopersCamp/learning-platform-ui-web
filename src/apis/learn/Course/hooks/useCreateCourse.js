import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Course from '../Course';

export function useCreateCourse() {
  const queryClient = useQueryClient();

  const { mutate: createCourse, isLoading: isCreating } = useMutation({
    mutationFn: (newCourse) => Course.getInstance().create(newCourse),
    onSuccess: () => {
      toast.success('Course created successfully');
      queryClient.invalidateQueries(['courses']);
    },
    onError: () => {
      toast.error('Failed to create course');
    },
  });

  return { createCourse, isCreating };
}
