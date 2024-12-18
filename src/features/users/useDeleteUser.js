import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '@/hooks/users/useRoleData.js';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }

      const headers = {
        'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || 'b_1',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      };

      const res = await serviceInstance.delete(user.roleId, { headers });
      return res;
    },
    onSuccess: () => {
      toast.success('User successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['role'] });
    },
    onError: (err) => {
      console.error('Deletion error:', err);
      toast.error('You are not authorized to delete this user');
    },
  });

  return { isDeleting, deleteUser };
}
