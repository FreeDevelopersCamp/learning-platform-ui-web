import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project';

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }) => Project.getInstance().update(data),
    onSuccess: () => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries(['projects']);
    },
    onError: () => {
      toast.error('Failed to update project');
    },
  });
}
