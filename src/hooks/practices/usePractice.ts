import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Practice from '../../services/practices/practice';
import toast from 'react-hot-toast';

export function usePractice(practiceId: string) {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const queryClient = useQueryClient();

  const {
    isLoading: practiceLoading,
    data: practice,
    error: practiceError,
  } = useQuery({
    queryKey: ['practice', practiceId],
    queryFn: () =>
      Practice.getPractice().getById(practiceId, {
        headers: defaultHeaders,
      }),
    enabled: !!practiceId,
    onError: () => toast.error('Failed to fetch practice details'),
  });

  const createPractice = useMutation({
    mutationFn: (data: Record<string, any>) =>
      Practice.getPractice().create(data, { headers: defaultHeaders }),
    onSuccess: () => {
      toast.success('Practice created successfully');
      queryClient.invalidateQueries(['practices']);
    },
    onError: () => toast.error('Failed to create practice'),
  });

  const updatePractice = useMutation({
    mutationFn: (data: Record<string, any>) =>
      Practice.getPractice().update(data, { headers: defaultHeaders }),
    onSuccess: () => {
      toast.success('Practice updated successfully');
      queryClient.invalidateQueries(['practices']);
    },
    onError: () => toast.error('Failed to update practice'),
  });

  const deletePractice = useMutation({
    mutationFn: (id: string) =>
      Practice.getPractice().delete(id, { headers: defaultHeaders }),
    onSuccess: () => {
      toast.success('Practice deleted successfully');
      queryClient.invalidateQueries(['practices']);
    },
    onError: () => toast.error('Failed to delete practice'),
  });

  return {
    isLoading: practiceLoading,
    error: practiceError,
    practice,
    createPractice,
    updatePractice,
    deletePractice,
  };
}
