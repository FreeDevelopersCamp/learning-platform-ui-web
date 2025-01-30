import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

export function useUpdateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }) => Roadmap.getInstance().update(data),
    onSuccess: () => {
      toast.success('Roadmap updated successfully');
      queryClient.invalidateQueries(['roadmaps']);
    },
    onError: () => {
      toast.error('Failed to update roadmap');
    },
  });
}
