import { useQuery } from '@tanstack/react-query';
import Instructor from '../Instructor';
import toast from 'react-hot-toast';

export function useGetInstructor(userId: string) {
  const {
    isLoading: instructorLoading,
    data: instructor,
    error: instructorError,
  } = useQuery({
    queryKey: ['instructor', userId],
    queryFn: () => Instructor.getInstance().getByUserId(userId),
    enabled: !!userId, // Only fetch when userId is available
    onError: () => toast.error('Failed to fetch instructor data'),
  });

  return {
    isLoading: instructorLoading,
    error: instructorError,
    instructor,
  };
}
