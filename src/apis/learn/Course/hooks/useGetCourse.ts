import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Course from '../Course';

export function useGetCourse(courseId: string) {
  const {
    isLoading: courseLoading,
    data: course,
    error: courseError,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => Course.getInstance().getById(courseId),
    enabled: !!courseId, // Ensures the query runs only if courseId exists
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch course'),
  });

  if (!courseId) {
    return {
      isLoading: false,
      course: null,
      error: null,
    };
  }

  return {
    isLoading: courseLoading,
    error: courseError,
    course,
  };
}
