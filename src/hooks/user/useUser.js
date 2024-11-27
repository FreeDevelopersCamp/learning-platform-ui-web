import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "../../utils/constants";
import { User } from "../../services/users/user";
import toast from "react-hot-toast";

export function useUser() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const userService = new User();

  // Fetch users
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.list(),
    keepPreviousData: true,
    onError: () => toast.error("Failed to fetch users"),
  });

  const users = data?.items || [];
  const totalUsersCount = users.length || 0;

  const expandedUsers = users.flatMap((user) =>
    user.roles.map((role) => ({
      ...user,
      role,
      id: `${user._id}-${role}`, // Composite unique ID
      roles: undefined,
    }))
  );

  // Filtering
  // A) by role
  const roleFilter = searchParams.get("role");

  const filteredUsers = expandedUsers.filter((user) => {
    if (roleFilter && roleFilter !== "all") {
      const roleMap = {
        admin: "0",
        owner: "1",
        manager: "2",
        "account-manager": "3",
        "content-manager": "4",
        instructor: "5",
        learner: "6",
      };
      return user.role === roleMap[roleFilter];
    }
    return true;
  });

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const getValue = (user) => {
      if (field === "name") {
        return `${user.personalInformation.name.first} ${user.personalInformation.name.last}`.toLowerCase();
      }

      return user[field] || "";
    };

    const valueA = getValue(a);
    const valueB = getValue(b);

    if (field === "role") {
      // Compare numerical ranks for roles
      return direction === "asc" ? valueB - valueA : valueA - valueB;
    }

    // Default string comparison
    return direction === "asc"
      ? valueB.localeCompare(valueA)
      : valueA.localeCompare(valueB);
  });

  // Pagination
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageUsers = sortedUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Prefetch adjacent pages
  const pageCount = Math.ceil(filteredUsers.length / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery(["users", currentPage + 1], () =>
      userService.list()
    );
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery(["users", currentPage - 1], () =>
      userService.list()
    );
  }

  return {
    isLoading,
    error,
    users: currentPageUsers,
    count: sortedUsers.length,
  };
}
