import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '@/hooks/users/useRoleData.js';

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeactivating, mutate: deactivateUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }

      const headers = {
        'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || 'b_1',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      };

      const res = await serviceInstance.deactivate(user.roleId, { headers });
      return res;
    },
    onSuccess: () => {
      toast.success('User successfully deactivated');
      queryClient.invalidateQueries({ queryKey: ['users', 'role'] });
    },
    onError: (err) => {
      console.error('Deactivation error:', err);
      toast.error('You are not authorized to deactivate this user');
    },
  });

  return { isDeactivating, deactivateUser };
}
