import { useQuery, useQueries } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { User } from "../../services/users/user";
import { getServiceInstanceByRole } from "./useRoleData"; // Import role-to-service mapping

export function useUser() {
  // Fetch user only once
  const {
    isLoading: usersLoading,
    data: userData,
    error: usersError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: (userId) => new User().getById(userId),
    keepPreviousData: true,
    onError: () => toast.error("Failed to fetch user"),
  });

  const user = userData || null;

  // Expand users by role
  const expandedUsers = user?.roles?.map((role) => ({
    ...user,
    role,
  }));

  // Use `useQueries` for role-specific data fetching
  const roleQueries = useQueries({
    queries: expandedUsers?.map((user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);

      if (!serviceInstance) {
        console.warn(`No service instance found for role: ${user.role}`);
      }

      return {
        queryKey: ["role", user.role, user.id],
        queryFn: () => serviceInstance?.getByUserId(user._id),
        enabled: !!serviceInstance, // Only fetch if serviceInstance is valid
        onError: () =>
          toast.error(`Failed to fetch data for user ID: ${user._id}`),
      };
    }),
  });

  // Map query results back to expandedUsers
  const userWithStatus = expandedUsers?.map((user, index) => {
    const query = roleQueries[index];
    return {
      ...user,
      roleId: query?.data?._id,
      status: query?.data?.status || "-1", // Default to "Unknown" if data isn't available
    };
  });

  return {
    isLoading: usersLoading || roleQueries.some((q) => q.isLoading),
    error: usersError || roleQueries.some((q) => q.error),
    user: userWithStatus,
    count: userWithStatus.length,
  };
}
