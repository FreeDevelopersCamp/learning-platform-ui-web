import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Profile } from '../Profile';

export function useUpdateProfile() {
  return useMutation(
    async (data) => {
      await new Profile().update(data);
    },
    {
      onSuccess: () => {
        toast.success('Profile updated successfully');
      },
      onError: (error) => {
        console.error('Error in mutation:', error);
        toast.error('Failed to update profile');
      },
    },
  );
}
