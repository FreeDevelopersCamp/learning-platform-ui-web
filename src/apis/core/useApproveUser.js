import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '@/apis/core/useRoleData.js';

export function useApproveUser() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      const res = await serviceInstance.approve(user.roleId);
      return res;
    },
    onSuccess: () => {
      toast.success('User successfully approved');
      queryClient.invalidateQueries({ queryKey: ['users', 'role'] });
    },
    onError: (err) => {
      console.error('Approval error:', err);
      toast.error('You are not authorized to approve this user');
    },
  });

  return { isApproving, approveUser };
}
