import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '@/hooks/users/useRoleData.js';

export function useApproveUser() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }

      const headers = {
        'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || 'b_1',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      };

      const res = await serviceInstance.approve(user.roleId, { headers });
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
