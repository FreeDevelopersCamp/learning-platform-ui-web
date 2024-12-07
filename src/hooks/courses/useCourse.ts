import { useQuery } from '@tanstack/react-query';
import Course from '../../services/courses/course';
import toast from 'react-hot-toast';

export function useCourse(courseId: string) {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  const {
    isLoading: courseLoading,
    data: course,
    error: courseError,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () =>
      Course.getCourse().request({
        path: `/course/${courseId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!courseId,
    onError: () => toast.error('Failed to fetch instructor data'),
  });

  return {
    isLoading: courseLoading,
    error: courseError,
    course,
  };
}
