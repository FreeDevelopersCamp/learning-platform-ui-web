import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Notification from '../Notification';

export function useGetNotifications(userId: string) {
  const {
    isLoading,
    data: notifications,
    error,
  } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => Notification.getInstance().listByUserId(userId),
    enabled: !!userId,
    keepPreviousData: true,
    onError: () => toast.error('Failed to load notifications'),
  });

  return { isLoading, notifications, error };
}
