import { useQuery } from '@tanstack/react-query';
import Roadmap from '../../services/roadmaps/roadmap';
import toast from 'react-hot-toast';

export function useRoadmaps() {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: allRoadmapsLoading,
    data: allRoadmaps,
    error: allRoadmapsError,
  } = useQuery({
    queryKey: ['roadmaps'],
    queryFn: () =>
      Roadmap.getroadmap().request({
        path: '/roadmap',
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    onError: () => toast.error('Failed to fetch all roadmaps'),
  });

  return {
    isAllRoadmapsLoading: allRoadmapsLoading,
    allRoadmapsError,
    allRoadmaps,
  };
}
