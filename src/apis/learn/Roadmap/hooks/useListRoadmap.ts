import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

const PAGE_SIZE = 10;

export function useListRoadmap(instructorId) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const {
    isLoading,
    data: roadmapsData,
    error,
  } = useQuery({
    queryKey: ['roadmaps', instructorId],
    queryFn: () =>
      instructorId
        ? Roadmap.getInstance().listByInstructor(instructorId)
        : Promise.resolve([]),
    keepPreviousData: true,
    enabled: !!instructorId, // Ensure query only runs if instructorId exists
    onError: () => toast.error('Failed to fetch roadmaps'),
  });

  const roadmaps = roadmapsData?.items || roadmapsData || [];

  // Filtering by status
  const statusFilter = searchParams.get('status') || 'all';
  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    if (statusFilter !== 'all') {
      const statusMap = {
        draft: 'draft',
        published: 'published',
        archived: 'archived',
      };
      return roadmap.status === statusMap[statusFilter];
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'title-asc';
  const [field, direction] = sortBy.split('-');
  const sortedRoadmaps = [...filteredRoadmaps].sort((a, b) => {
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
  const currentPageRoadmaps = sortedRoadmaps.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageCount = Math.ceil(sortedRoadmaps.length / PAGE_SIZE);

  // Prefetch adjacent pages
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['roadmaps', instructorId, currentPage + 1],
      queryFn: () =>
        Roadmap.getInstance().listByInstructor(instructorId, {
          params: {
            page: currentPage + 1,
            limit: PAGE_SIZE,
          },
        }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['roadmaps', instructorId, currentPage - 1],
      queryFn: () =>
        Roadmap.getInstance().listByInstructor(instructorId, {
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
    roadmaps: currentPageRoadmaps,
    count: sortedRoadmaps.length,
    totalRoadmaps: roadmaps.length,
    pageCount,
    instructorRoadmaps: roadmaps,
  };
}
