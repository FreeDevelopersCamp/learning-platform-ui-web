import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Profile } from '../Profile';

export function useUpdateProfile() {
  return useMutation(
    async (data) => {
      console.log(data);
      await new Profile().update(data);
    },
    {
      onSuccess: () => {
        toast.success('Profile updated successfully');
      },
      onError: () => {
        toast.error('Failed to update profile');
      },
    },
  );
}
