import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project'; // Ensure this points to your API service

export function useUpdateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedProject) => {
      return Project.getInstance().update(updatedProject);
    },
    onSuccess: () => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Update Project Error:', error);
      toast.error('Failed to update project');
    },
  });

  return {
    isUpdating: mutation.isLoading,
    updateProject: mutation.mutate, // ✅ Explicitly return the function
  };
}
