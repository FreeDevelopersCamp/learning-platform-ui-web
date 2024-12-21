import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { User } from '../User';

export function useUpdateUser() {
  return useMutation(
    async (data) => {
      await new User().update(data);
    },
    {
      onSuccess: () => {
        toast.success('User updated successfully');
      },
      onError: () => {
        toast.error('Failed to update user');
      },
    },
  );
}
