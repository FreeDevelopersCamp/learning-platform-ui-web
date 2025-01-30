import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProject } = useMutation({
    mutationFn: async (projectId) => {
      // Call the delete method from the Project service
      const res = await Project.getInstance().delete(projectId);
      return res;
    },
    onSuccess: () => {
      toast.success('Project successfully deleted');
      // Invalidate the 'projects' query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err) => {
      console.error('Deletion error:', err);
      toast.error('Failed to delete the project');
    },
  });

  return { isDeleting, deleteProject };
}
