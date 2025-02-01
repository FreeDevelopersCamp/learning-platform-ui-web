import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 50px; /* Adjusted to appear below header */
  right: 20px; /* Align to the right */
  width: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1050;
  padding: 15px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const NotificationList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  background: ${(props) => (props.seen ? '#f9f9f9' : '#e0f7fa')};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f0f4ff;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  font-size: 14px;
`;

const ViewAllButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #8a49e7;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background: #7024c4;
  }
`;

const NotificationsModal = ({ notifications, onClose }) => {
  return (
    <ModalOverlay onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        Notifications
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ModalHeader>
      <NotificationList>
        {notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          notifications.map((notif) => (
            <NotificationItem key={notif._id} seen={notif.status === '1'}>
              <NotificationContent>{notif.message}</NotificationContent>
            </NotificationItem>
          ))
        )}
      </NotificationList>
      <ViewAllButton>View All Notifications</ViewAllButton>
    </ModalOverlay>
  );
};

export default NotificationsModal;
