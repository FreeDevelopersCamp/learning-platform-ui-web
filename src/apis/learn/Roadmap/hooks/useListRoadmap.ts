import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Roadmap from '../Roadmap';

const PAGE_SIZE = 10;

export function useListRoadmap() {
  const [searchParams] = useSearchParams();

  const {
    isLoading,
    data: roadmapsData,
    error,
  } = useQuery({
    queryKey: ['roadmaps'],
    queryFn: () => Roadmap.getInstance().list(),
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch roadmaps'),
  });

  const roadmaps = roadmapsData?.items || [];

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'title-asc';
  const [field, direction] = sortBy.split('-');
  const sortedRoadmaps = [...roadmaps].sort((a, b) => {
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

  return {
    isLoading,
    error,
    roadmaps: currentPageRoadmaps,
    count: sortedRoadmaps.length,
    totalRoadmaps: roadmaps.length,
    pageCount,
  };
}
