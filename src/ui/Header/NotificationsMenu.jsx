import styled from 'styled-components';
import { useState } from 'react';
import { RiNotificationLine, RiCloseLine } from 'react-icons/ri';
import { MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useUpdateNotification } from '../../apis/communication/Notification/hooks/useUpdateNotification';
import { useDeleteNotification } from '../../apis/communication/Notification/hooks/useDeleteNotification';
import { formatNotificationDate } from '../../utils/formatDate';
import { useGetNotifications } from '../../apis/communication/Notification/hooks/useGetNotifications';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

const StyledToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2.4rem;
  color: var(--color-grey-700);
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-grey-600);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StyledList = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: var(--color-grey-0);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius-lg);
  width: 450px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 9999;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--color-grey-300);
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const UnreadBadge = styled.span`
  background: #ff4747;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 10px 7px;
  border-radius: 50%;
  position: absolute;
  top: -4px;
  right: -4px;
  transform: translate(50%, -50%);
  display: ${({ count }) => (count > 0 ? 'inline-block' : 'none')};
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid var(--color-grey-200);
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  font-size: 14px;
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
  margin-left: 8px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--color-grey-500);

  &:hover {
    color: var(--color-grey-900);
  }
`;

const ViewAllButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #8a49e7;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #7024c4;
  }
`;

function NotificationsMenu({ notifications, setNotifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const navigate = useNavigate();

  const unreadCount =
    notifications?.filter((notif) => notif.status === '0')?.length || 0;
  const { updateNotification, isUpdating } = useUpdateNotification();
  const deleteNotification = useDeleteNotification();
  const [allRead, setAllRead] = useState(unreadCount === 0);

  const toggleAllNotifications = () => {
    const newStatus = allRead ? '0' : '1';
    notifications?.forEach((notif) => {
      updateNotification({
        notificationId: notif._id,
        status: newStatus,
      });
    });
    setAllRead(!allRead);
  };

  if (isUpdating) return <Spinner />;

  return (
    <div style={{ position: 'relative' }}>
      <StyledToggle onClick={() => setIsOpen((prev) => !prev)}>
        <RiNotificationLine />
        <UnreadBadge count={unreadCount}>{unreadCount}</UnreadBadge>
      </StyledToggle>

      {isOpen && (
        <StyledList ref={ref}>
          <StyledHeader>
            Notifications
            <button onClick={toggleAllNotifications}>
              {allRead ? (
                <MdOutlineMailOutline size={26} />
              ) : (
                <MdOutlineMarkEmailRead size={26} />
              )}
              <UnreadBadge count={unreadCount}>{unreadCount}</UnreadBadge>
            </button>
          </StyledHeader>

          <NotificationList>
            {notifications?.length > 0 ? (
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
                  <NotificationContent>
                    {notification.message}
                  </NotificationContent>
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
            ) : (
              <p
                style={{ padding: '12px', textAlign: 'center', color: 'gray' }}
              >
                No notifications available
              </p>
            )}
          </NotificationList>

          {notifications?.length > 0 && (
            <ViewAllButton onClick={() => navigate('/settings/notifications')}>
              View All Notifications
            </ViewAllButton>
          )}
        </StyledList>
      )}
    </div>
  );
}

const Toggle = ({ id }) => {
  const { notifications } = useGetNotifications(id); // You'll need to create this hook
  const unreadCount = notifications.filter((n) => n.status === '0').length;

  return (
    <StyledToggle>
      <RiNotificationLine />
      <UnreadBadge count={unreadCount}>{unreadCount}</UnreadBadge>
    </StyledToggle>
  );
};

NotificationsMenu.Toggle = Toggle;

export default NotificationsMenu;
