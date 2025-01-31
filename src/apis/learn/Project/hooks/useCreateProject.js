import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project'; // Ensure this points to your API service

export function useCreateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newProject) => {
      return Project.getInstance().create(newProject);
    },
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Create Project Error:', error);
      toast.error('Failed to create project');
    },
  });

  return {
    isCreating: mutation.isLoading,
    createProject: mutation.mutate, // ✅ Explicitly return the function
  };
}
