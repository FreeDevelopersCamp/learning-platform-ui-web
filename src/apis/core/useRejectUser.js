import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from './useRoleData.js';

export function useRejectUser() {
  const queryClient = useQueryClient();

  const { isLoading: isRejecting, mutate: rejectUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }

      const res = await serviceInstance.reject(user.roleId);
      return res;
    },
    onSuccess: () => {
      toast.success('User successfully rejected');
      queryClient.invalidateQueries({
        queryKey: ['role', 'users'],
        exact: true,
      });
    },
    onError: (err) => {
      console.error('Rejection error:', err);
      toast.error('You are not authorized to reject this user');
    },
  });

  return { isRejecting, rejectUser };
}
