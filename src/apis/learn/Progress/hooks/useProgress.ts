import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Progress from '../Progress';

// Fetch Progress by ID
export function useFetchProgressById(progressId?: string) {
  return useQuery({
    queryKey: ['progress', progressId],
    queryFn: () => new Progress().getById(progressId),
    enabled: !!progressId,
    onError: () => toast.error('Failed to fetch progress data'),
  });
}

// Fetch Progress by User ID
export function useFetchProgressByUserId(userId?: string) {
  return useQuery({
    queryKey: ['progressByUserId', userId],
    queryFn: () => new Progress().getByUserId(userId),
    enabled: !!userId,
    onError: () => toast.error('Failed to fetch user progress data'),
  });
}

// Create Progress
export function useCreateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProgress: Record<string, any>) =>
      new Progress().create(newProgress),
    onSuccess: () => {
      toast.success('Progress created successfully');
      queryClient.invalidateQueries(['progress']);
    },
    onError: () => toast.error('Failed to create progress'),
  });
}

// Update Progress
export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProgress: Record<string, any>) =>
      new Progress().update(updatedProgress),
    onSuccess: () => {
      toast.success('Progress updated successfully');
      queryClient.invalidateQueries(['progress']);
    },
    onError: () => toast.error('Failed to update progress'),
  });
}

// Delete Progress
export function useDeleteProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => new Progress().delete(id),
    onSuccess: () => {
      toast.success('Progress deleted successfully');
      queryClient.invalidateQueries(['progress']);
    },
    onError: () => toast.error('Failed to delete progress'),
  });
}
