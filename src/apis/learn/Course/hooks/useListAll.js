import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Course from '../Course';

export function useListAll() {
  const {
    isLoading: coursesLoading,
    data: courses,
    error: coursesError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      try {
        return await Course.getInstance().list(); // ✅ Fetch all courses
      } catch (error) {
        toast.error('Failed to fetch courses');
        throw error;
      }
    },
    keepPreviousData: true, // ✅ Keep previous data for better UI experience
    onError: () => toast.error('Failed to load courses'),
  });

  return {
    isLoading: coursesLoading,
    error: coursesError,
    courses,
  };
}
