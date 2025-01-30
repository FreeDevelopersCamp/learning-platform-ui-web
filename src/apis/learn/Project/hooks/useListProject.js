import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Project from '../Project';

const PAGE_SIZE = 10;

export function useListProjects() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const {
    isLoading,
    data: projectsData,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => Project.getInstance().list(),
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch projects'),
  });

  const projects = projectsData?.items || [];

  // Filtering by status
  const statusFilter = searchParams.get('status') || 'all';
  const filteredProjects = projects.filter((project) => {
    if (statusFilter !== 'all') {
      const statusMap = {
        draft: 'draft',
        published: 'published',
        archived: 'archived',
      };
      return project.status === statusMap[statusFilter];
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'title-asc';
  const [field, direction] = sortBy.split('-');
  const sortedProjects = [...filteredProjects].sort((a, b) => {
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
  const currentPageProjects = sortedProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageCount = Math.ceil(sortedProjects.length / PAGE_SIZE);

  // Prefetch adjacent pages
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['projects', currentPage + 1],
      queryFn: () =>
        Project.getInstance().list({
          params: {
            page: currentPage + 1,
            limit: PAGE_SIZE,
          },
        }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['projects', currentPage - 1],
      queryFn: () =>
        Project.getInstance().list({
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
    projects: currentPageProjects,
    count: sortedProjects.length,
    totalProjects: projects.length,
    pageCount,
    allProjects: projects,
  };
}
