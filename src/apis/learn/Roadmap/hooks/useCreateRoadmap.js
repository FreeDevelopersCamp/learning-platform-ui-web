import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

export function useCreateRoadmap() {
  const queryClient = useQueryClient();

  const { mutate: createRoadmap, isLoading: isCreating } = useMutation({
    mutationFn: async (newRoadmap) => {
      console.log('API Request Payload:', newRoadmap); // ✅ Debugging log
      return Roadmap.getInstance().create(newRoadmap);
    },
    onSuccess: () => {
      toast.success('Roadmap created successfully');
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
    onError: (error) => {
      console.error('Create Roadmap Error:', error);
      toast.error('Failed to create roadmap');
    },
  });

  return {
    isCreating,
    createRoadmap,
  };
}
