import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getServiceInstanceByRole } from "../../hooks/users/useRoleData";

export function useApproveUser() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveUser } = useMutation({
    mutationFn: async (user) => {
      await getServiceInstanceByRole(user.role).approve(user.roleId);
    },
    onSuccess: () => {
      toast.success("Users successfully approved");
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isApproving, approveUser };
}
