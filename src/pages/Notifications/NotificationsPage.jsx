import { useState } from 'react';
import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import { MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetNotifications } from '../../apis/communication/Notification/hooks/useGetNotifications';
import { useUpdateNotification } from '../../apis/communication/Notification/hooks/useUpdateNotification';
import { useDeleteNotification } from '../../apis/communication/Notification/hooks/useDeleteNotification';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { formatNotificationDate } from '../../utils/formatDate';
import Spinner from '../../ui/Spinner';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--color-grey-300);
  font-size: 22px;
  font-weight: bold;
`;

const HeaderIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: var(--color-grey-700);
  position: relative;
  padding: 5px;

  &:hover {
    color: var(--color-grey-900);
  }
`;

const UnreadBadge = styled.span`
  background: #ff4747;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 7px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
  display: ${({ count }) => (count > 0 ? 'inline-block' : 'none')};
`;

const NotificationList = styled.div`
  margin-top: 10px;
  max-height: 500px;
  overflow-y: auto;
  border-top: 1px solid var(--color-grey-300);
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  cursor: pointer;
  transition: background 0.3s;
  border-bottom: 1px solid var(--color-grey-200);
  position: relative;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  font-size: 16px;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #999;
`;

const UnreadIndicator = styled.span`
  width: 6px;
  height: 6px;
  background: #8a49e7;
  border-radius: 50%;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--color-grey-500);

  &:hover {
    color: var(--color-grey-900);
  }
`;

function NotificationsPage() {
  const { isLoading: sessionLoading, session } = useAuth();
  const { user, isLoading: userLoading } = useGetUser(session?.username);
  const { notifications, isLoading } = useGetNotifications(user?._id);
  const { updateNotification } = useUpdateNotification();
  const { deleteNotification } = useDeleteNotification();

  const [allRead, setAllRead] = useState(
    notifications?.every((notif) => notif.status === '1'),
  );

  if (sessionLoading || userLoading || !session || !user || isLoading)
    return <Spinner />;

  const toggleAllNotifications = () => {
    const newStatus = allRead ? '0' : '1';
    notifications?.forEach((notif) => {
      updateNotification({ notificationId: notif._id, status: newStatus });
    });
    setAllRead(!allRead);
  };

  const unreadCount =
    notifications?.filter((notif) => notif.status === '0')?.length || 0;

  return (
    <Container>
      <Header>
        Notifications
        <HeaderIcon onClick={toggleAllNotifications}>
          {allRead ? <MdOutlineMailOutline /> : <MdOutlineMarkEmailRead />}
          {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </HeaderIcon>
      </Header>

      <NotificationList>
        {notifications?.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications?.map((notification) => (
            <NotificationItem
              key={notification._id}
              onClick={() =>
                updateNotification({
                  notificationId: notification._id,
                  status: notification.status === '1' ? '0' : '1',
                })
              }
            >
              <NotificationContent>{notification.message}</NotificationContent>
              <NotificationTime>
                {formatNotificationDate(notification?.created?.at)}
              </NotificationTime>
              {notification.status === '0' && <UnreadIndicator />}
              <RemoveButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification._id);
                }}
              >
                <RiCloseLine />
              </RemoveButton>
            </NotificationItem>
          ))
        )}
      </NotificationList>
    </Container>
  );
}

export default NotificationsPage;
