import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Project from '../Project';

export function useGetProject(projectId) {
  const {
    isLoading: projectLoading,
    data: project,
    error: projectError,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      return await Project.getInstance().getById(projectId);
    },
    enabled: !!projectId, // Ensures the query only runs if projectId is provided
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch project'),
  });

  return {
    isLoading: projectLoading,
    error: projectError,
    project,
  };
}
