import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Progress from '../../services/learner/progress';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');
const defaultHeaders = {
  Authorization: `Bearer ${token}`,
  'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
};

// Fetch Progress by ID
export function useFetchProgressById(progressId?: string) {
  return useQuery({
    queryKey: ['progress', progressId],
    queryFn: () =>
      Progress.getProgress().request({
        path: `/progress/${progressId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!progressId,
    onError: () => toast.error('Failed to fetch progress data'),
  });
}

// Fetch Progress by User ID
export function useFetchProgressByUserId(userId?: string) {
  return useQuery({
    queryKey: ['progressByUserId', userId],
    queryFn: () =>
      Progress.getProgress().request({
        path: `/progress/userId/${userId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!userId,
    onError: () => toast.error('Failed to fetch user progress data'),
  });
}

// Create Progress
export function useCreateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProgress: Record<string, any>) =>
      Progress.getProgress().request({
        path: '/progress',
        method: 'POST',
        body: newProgress,
        secure: true,
        headers: defaultHeaders,
      }),
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
      Progress.getProgress().request({
        path: '/progress',
        method: 'PATCH',
        body: updatedProgress,
        secure: true,
        headers: defaultHeaders,
      }),
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
    mutationFn: (id: string) =>
      Progress.getProgress().request({
        path: `/progress/${id}`,
        method: 'DELETE',
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Progress deleted successfully');
      queryClient.invalidateQueries(['progress']);
    },
    onError: () => toast.error('Failed to delete progress'),
  });
}
