import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

export function useUpdateRoadmap() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedRoadmap) => {
      return Roadmap.getInstance().update(updatedRoadmap);
    },
    onSuccess: () => {
      toast.success('Roadmap updated successfully');
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
    onError: (error) => {
      console.error('Update Roadmap Error:', error);
      toast.error('Failed to update roadmap');
    },
  });

  return {
    isUpdating: mutation.isLoading,
    updateRoadmap: mutation.mutate, // ✅ Explicitly return the function
  };
}
