import { useQuery } from '@tanstack/react-query';
import Roadmap from '../../services/roadmaps/roadmap';
import toast from 'react-hot-toast';

export function useRoadmap(roadmapId: string) {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: roadmapLoading,
    data: roadmap,
    error: roadmapError,
  } = useQuery({
    queryKey: ['roadmap', roadmapId],
    queryFn: () =>
      Roadmap.getroadmap().request({
        path: `/roadmap/${roadmapId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!roadmapId,
    onError: () => toast.error('Failed to fetch instructor data'),
  });

  return {
    isLoading: roadmapLoading,
    error: roadmapError,
    roadmap,
  };
}
