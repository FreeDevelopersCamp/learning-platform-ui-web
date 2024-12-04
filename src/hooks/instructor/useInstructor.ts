import { useQuery } from '@tanstack/react-query';
import Instructor from '../../services/users/instructor';
import toast from 'react-hot-toast';

export function useInstructor(userId: string) {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: instructorLoading,
    data: instructor,
    error: instructorError,
  } = useQuery({
    queryKey: ['instructor', userId],
    queryFn: () =>
      Instructor.getInstance().request({
        path: `/instructor/user/${userId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!userId, // Only fetch when userId is available
    onError: () => toast.error('Failed to fetch instructor data'),
  });

  return {
    isLoading: instructorLoading,
    error: instructorError,
    instructor,
  };
}
