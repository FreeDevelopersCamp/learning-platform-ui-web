import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import Course from '../Course';

const PAGE_SIZE = 10;

export function useListCourse(instructorId) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Fetch all courses for the instructor
  const {
    isLoading,
    data: coursesData,
    error,
  } = useQuery({
    queryKey: ['courses', instructorId],
    queryFn: () => Course.getInstance().listByInstructor(instructorId),
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch courses'),
  });

  const courses = coursesData?.items || [];

  // Filtering by status
  const statusFilter = searchParams.get('status') || 'all';
  const filteredCourses = courses.filter((course) => {
    if (statusFilter !== 'all') {
      const statusMap = {
        draft: 'draft',
        published: 'published',
        archived: 'archived',
      };
      return course.status === statusMap[statusFilter];
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'title-asc';
  const [field, direction] = sortBy.split('-');
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const valueA =
      field === 'title' ? a.title?.toLowerCase() : new Date(a[field]);
    const valueB =
      field === 'title' ? b.title?.toLowerCase() : new Date(b[field]);

    if (field === 'createdAt') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return direction === 'asc'
      ? valueA?.localeCompare(valueB)
      : valueB?.localeCompare(valueA);
  });

  // Pagination
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentPageCourses = sortedCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageCount = Math.ceil(sortedCourses.length / PAGE_SIZE);

  // Prefetch adjacent pages
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['courses', instructorId, currentPage + 1],
      queryFn: () =>
        Course.getInstance().listByInstructor(instructorId, {
          params: {
            page: currentPage + 1,
            limit: PAGE_SIZE,
          },
        }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['courses', instructorId, currentPage - 1],
      queryFn: () =>
        Course.getInstance().listByInstructor(instructorId, {
          params: {
            page: currentPage - 1,
            limit: PAGE_SIZE,
          },
        }),
    });
  }

  return {
    isLoading,
    error,
    courses: currentPageCourses,
    count: sortedCourses.length,
    totalCourses: courses.length,
    pageCount,
    instructorCourses: courses,
  };
}
