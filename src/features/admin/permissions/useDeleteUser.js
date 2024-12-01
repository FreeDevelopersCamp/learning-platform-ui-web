import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getServiceInstanceByRole } from "../../hooks/users/useRoleData";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: async (user) => {
      await getServiceInstanceByRole(user.role).delete(user.roleId);
    },
    onSuccess: () => {
      toast.success("User successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["role"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}
