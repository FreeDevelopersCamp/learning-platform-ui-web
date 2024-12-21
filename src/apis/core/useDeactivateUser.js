import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '@/apis/core/useRoleData.js';

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeactivating, mutate: deactivateUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }

      const res = await serviceInstance.deactivate(user.roleId);
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
