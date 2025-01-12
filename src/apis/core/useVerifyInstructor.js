import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getServiceInstanceByRole } from '@/apis/core/useRoleData.js';

export function useVerifyInstructor() {
  const queryClient = useQueryClient();

  const { isLoading: isVerifying, mutate: verifyInstructor } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      return await serviceInstance.verify(user.roleId);
    },
    onSuccess: () => {
      toast.success('User successfully verified');
      queryClient.invalidateQueries({ queryKey: ['users', 'role'] });
    },
    onError: (err) => {
      console.error('Verifying error:', err);
      toast.error('You are not authorized to verify this instructor');
    },
  });

  return { isVerifying, verifyInstructor };
}
