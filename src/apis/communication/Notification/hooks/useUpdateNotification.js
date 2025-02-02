import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Notification from '../Notification';

export function useUpdateNotification() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ notificationId, status }) => {
      const response = await Notification.getInstance().update(
        notificationId,
        status,
      );

      if (!response || response.error) {
        throw new Error('Failed to update notification');
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Notification updated!');
      queryClient.invalidateQueries(['notifications']);
    },
    onError: () => {
      toast.error('Failed to update notification');
    },
  });

  return { updateNotification: mutate, isUpdating };
}
