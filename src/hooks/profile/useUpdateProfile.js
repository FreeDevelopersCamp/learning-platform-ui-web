import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Profile from '../../apis/core/Profile';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation(async (data) => await Profile.update(data), {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully',
        visibilityTime: 3000,
      });
      queryClient.invalidateQueries(['profile']); // Refresh profile data
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update profile',
        visibilityTime: 3000,
      });
    },
  });
}
