import { useQuery, useQueryClient, useQueries } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PAGE_SIZE } from '../../utils/constants';
import { User } from '../../services/users/user';
import { getServiceInstanceByRole } from './useRoleData';

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem('token'); // Or get from `auth` if available

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
  };

  // Fetch users only once
  const {
    isLoading: usersLoading,
    data: usersData,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      new User().request({
        path: `/user`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    keepPreviousData: true,
    onError: () => toast.error('Failed to fetch users'),
  });

  const users = usersData?.items || [];

  // Expand users by role
  const expandedUsers = users.flatMap((user) =>
    user.roles.map((role) => ({
      ...user,
      role,
      roleId: `${user._id}-${role}`,
      roles: undefined,
    })),
  );

  // Use `useQueries` for role-specific data fetching
  const roleQueries = useQueries({
    queries: expandedUsers.map((user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);

      if (!serviceInstance) {
        console.warn(`No service instance found for role: ${user.role}`);
      }

      return {
        queryKey: ['role', user.role, user.roleId],
        queryFn: () =>
          serviceInstance?.getByUserId(user._id, {
            headers: defaultHeaders,
          }),
        enabled: !!serviceInstance, // Only fetch if serviceInstance is valid
        onError: () =>
          toast.error(`Failed to fetch data for user ID: ${user._id}`),
      };
    }),
  });

  // Map query results back to expandedUsers
  const usersWithStatus = expandedUsers.map((user, index) => {
    const query = roleQueries[index];
    return {
      ...user,
      roleId: query?.data?._id,
      status: query?.data?.status || '-1', // Default to "Unknown" if data isn't available
    };
  });

  // Role filtering logic
  const roleFilter = searchParams.get('role');
  let filteredUsers = usersWithStatus.filter((user) => {
    if (roleFilter && roleFilter !== 'all') {
      const roleMap = {
        admin: '0',
        owner: '1',
        manager: '2',
        'account-manager': '3',
        'content-manager': '4',
        instructor: '5',
        learner: '6',
      };
      return user.role === roleMap[roleFilter];
    }
    return true;
  });

  // Status filtering
  const statusFilter = searchParams.get('status');
  const filteredUsers2 = filteredUsers.filter((user) => {
    if (statusFilter && statusFilter !== 'all') {
      const statusMap = {
        pending: '1',
        activated: '2',
        deactivated: '3',
      };
      return user.status === statusMap[statusFilter];
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'name-desc';
  const [field, direction] = sortBy.split('-');
  const sortedUsers = [...filteredUsers2].sort((a, b) => {
    const getValue = (user) => {
      if (field === 'name') {
        return `${user.personalInformation.name.first} ${user.personalInformation.name.last}`.toLowerCase();
      }
      return user[field] || '';
    };

    const valueA = getValue(a);
    const valueB = getValue(b);

    if (field === 'role') {
      return direction === 'asc' ? valueB - valueA : valueA - valueB;
    }

    return direction === 'asc'
      ? valueB.localeCompare(valueA)
      : valueA.localeCompare(valueB);
  });

  // Pagination logic
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentPageUsers = sortedUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageCount = Math.ceil(filteredUsers.length / PAGE_SIZE);

  // Prefetch adjacent pages
  if (currentPage < pageCount) {
    queryClient.prefetchQuery(['users', currentPage + 1], () =>
      new User().request({
        path: `/user`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    );
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery(['users', currentPage - 1], () =>
      new User().request({
        path: `/user`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    );
  }

  return {
    isLoading: usersLoading || roleQueries.some((q) => q.isLoading),
    error: usersError || roleQueries.some((q) => q.error),
    users: currentPageUsers,
    count: sortedUsers.length,
    totalUsers: usersWithStatus,
  };
}
