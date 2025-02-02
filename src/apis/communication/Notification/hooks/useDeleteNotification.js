import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Notification from '../Notification';

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: async (notificationId) => {
      const response = await Notification.getInstance().delete(notificationId);

      if (!response || response.error) {
        throw new Error('Failed to delete notification');
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Notification deleted!');
      queryClient.invalidateQueries(['notifications']); // Refresh data
    },
    onError: () => {
      toast.error('Failed to delete notification');
    },
  });

  return { deleteNotification: mutate, isDeleting };
}
