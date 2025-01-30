import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

export function useDeleteRoadmap() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutateAsync: deleteRoadmap } = useMutation({
    mutationFn: async (id) => {
      const response = await Roadmap.getInstance().delete(id);
      return response;
    },
    onSuccess: () => {
      toast.success('Roadmap deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
    onError: (error) => {
      console.error('Deletion error:', error);
      toast.error('Failed to delete roadmap');
    },
  });

  return { isDeleting, deleteRoadmap };
}
