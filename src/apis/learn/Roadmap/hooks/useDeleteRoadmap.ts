import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

export function useDeleteRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => Roadmap.getInstance().delete(id),
    onSuccess: () => {
      toast.success('Roadmap deleted successfully');
      queryClient.invalidateQueries(['roadmaps']);
    },
    onError: () => {
      toast.error('Failed to delete roadmap');
    },
  });
}
