import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => Project.getInstance().delete(id),
    onSuccess: () => {
      toast.success('Project deleted successfully');
      queryClient.invalidateQueries(['projects']);
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });
}
