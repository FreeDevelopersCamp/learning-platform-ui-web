import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { User } from "../../services/user/user";

export function useUser() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const user = new User();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["users", filter, sortBy, page],
    queryFn: () => user.list({ filter, sortBy, page }),
  });

  const users = data?.items || [];
  const count = users?.length || 0;

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["users", filter, sortBy, page + 1],
      queryFn: () => user.list({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["users", filter, sortBy, page - 1],
      queryFn: () => user.list({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, users, count };
}
