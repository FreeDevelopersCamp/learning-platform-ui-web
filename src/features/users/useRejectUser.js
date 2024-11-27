import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getServiceInstanceByRole } from "../../hooks/users/useRoleData";

export function useRejectUser() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: rejectUser } = useMutation({
    mutationFn: async (user) => {
      await getServiceInstanceByRole(user.role).reject(user._id);
    },
    onSuccess: () => {
      toast.success("Users successfully rejected");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isApproving, rejectUser };
}