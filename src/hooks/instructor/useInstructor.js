import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PAGE_SIZE } from '../../utils/constants';
import Instructor from '../../services/users/instructor';

export function useInstructor(token) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Fetch instructor data
  const {
    isLoading: instructorsLoading,
    data: instructorsData,
    error: instructorsError,
  } = useQuery({
    queryKey: ['instructors'],
    queryFn: () => Instructor.getInstance().list({}, token),
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch instructors'),
  });

  const instructors = instructorsData?.items || [];

  // Filter logic
  const statusFilter = searchParams.get('status');
  const filteredInstructors = instructors.filter((instructor) => {
    if (statusFilter && statusFilter !== 'all') {
      const statusMap = {
        pending: '1',
        activated: '2',
        deactivated: '3',
      };
      return instructor.status === statusMap[statusFilter];
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    const getValue = (instructor) => {
      if (field === 'name') {
        return `${instructor.personalInformation.name.first} ${instructor.personalInformation.name.last}`.toLowerCase();
      }
      return instructor[field] || '';
    };

    const valueA = getValue(a);
    const valueB = getValue(b);

    return direction === 'asc'
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  // Pagination logic
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentPageInstructors = sortedInstructors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageCount = Math.ceil(filteredInstructors.length / PAGE_SIZE);

  // Prefetch adjacent pages
  if (currentPage < pageCount) {
    queryClient.prefetchQuery(['instructors', currentPage + 1], () =>
      Instructor.getInstance().list({}, token),
    );
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery(['instructors', currentPage - 1], () =>
      Instructor.getInstance().list({}, token),
    );
  }

  return {
    isLoading: instructorsLoading,
    error: instructorsError,
    instructors: currentPageInstructors,
    count: sortedInstructors.length,
    totalInstructors: instructors,
  };
}

export default useInstructor;
