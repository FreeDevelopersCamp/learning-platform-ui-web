import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Practice from '../Practice';

const PAGE_SIZE = 10;

export function useListAll() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const {
    isLoading,
    data: practicesData,
    error,
  } = useQuery({
    queryKey: ['practices'],
    queryFn: () => Practice.getInstance().list(),
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch practices'),
  });

  const practices = practicesData?.items || [];

  // Filtering by status
  const statusFilter = searchParams.get('status') || 'all';
  const filteredPractices = practices.filter((practice) => {
    if (statusFilter !== 'all') {
      const statusMap = {
        draft: 'draft',
        published: 'published',
        archived: 'archived',
      };
      return practice.status === statusMap[statusFilter];
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'title-asc';
  const [field, direction] = sortBy.split('-');
  const sortedPractices = [...filteredPractices].sort((a, b) => {
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
  const currentPagePractices = sortedPractices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageCount = Math.ceil(sortedPractices.length / PAGE_SIZE);

  // Prefetch adjacent pages
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['practices', currentPage + 1],
      queryFn: () =>
        Practice.getInstance().list({
          params: {
            page: currentPage + 1,
            limit: PAGE_SIZE,
          },
        }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['practices', currentPage - 1],
      queryFn: () =>
        Practice.getInstance().list({
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
    practices: currentPagePractices,
    count: sortedPractices.length,
    totalPractices: practices.length,
    pageCount,
    allPractices: practices,
  };
}
