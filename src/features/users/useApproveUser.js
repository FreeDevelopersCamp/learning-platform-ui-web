import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getServiceInstanceByRole } from "../../hooks/users/useRoleData";
import { useNavigate } from "react-router-dom";

export function useApproveUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveUser } = useMutation({
    mutationFn: async (user) => {
      await getServiceInstanceByRole(user.role).approve(user.roleId);
    },
    onSuccess: () => {
      toast.success("Users successfully approved");
      queryClient.invalidateQueries({ queryKey: ["role"] });

      navigate("/users");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isApproving, approveUser };
}
