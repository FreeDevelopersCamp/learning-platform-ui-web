import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '../../../hooks/users/useRoleData';

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeactivating, mutate: deactivateUser } = useMutation({
    mutationFn: async (user) => {
      await getServiceInstanceByRole(user.role).deactivate(user.roleId);
    },
    onSuccess: () => {
      toast.success('Users successfully deactivated');
      queryClient.invalidateQueries({ queryKey: ['users', 'role'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeactivating, deactivateUser };
}
