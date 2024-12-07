import { useQuery } from '@tanstack/react-query';
import Project from '../../services/projects/project';
import toast from 'react-hot-toast';

export function useProject(projectId: string) {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: projectLoading,
    data: project,
    error: projectError,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () =>
      Project.getProject().request({
        path: `/project/${projectId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!projectId,
    onError: () => toast.error('Failed to fetch instructor data'),
  });

  return {
    isLoading: projectLoading,
    error: projectError,
    project,
  };
}
