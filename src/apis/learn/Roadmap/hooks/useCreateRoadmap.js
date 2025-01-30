import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

export function useCreateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRoadmap) => Roadmap.getInstance().create(newRoadmap),
    onSuccess: () => {
      toast.success('Roadmap created successfully');
      queryClient.invalidateQueries(['roadmaps']);
    },
    onError: () => {
      toast.error('Failed to create roadmap');
    },
  });
}
