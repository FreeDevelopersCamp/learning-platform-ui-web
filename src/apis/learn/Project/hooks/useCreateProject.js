import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project';

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject) => Project.getInstance().create(newProject),
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries(['projects']);
    },
    onError: () => {
      toast.error('Failed to create project');
    },
  });
}
