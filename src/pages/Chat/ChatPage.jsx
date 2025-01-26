import React, { useState } from 'react';
import ChatContainer from '@/ui/Message/ChatContainer.jsx';
import ChatSidebar from '@/ui/Message/ChatSidebar.jsx';
import Spinner from '@/ui/Spinner.jsx';
import { useAuth } from '@/contexts/auth/AuthContext.jsx';
import { useListUser } from '@/apis/core/User/hooks/useListUser.js';
import styled from 'styled-components';

const Container = styled.div`
  margin: 5rem 10rem;
  background-color: var(--color-theme-200);
  box-shadow: var(--shadow-md);
  height: 80vh;
`;

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { usersData: users, isLoading } = useListUser(); // Fetch all users
  const { session, isLoading: sessionLoading } = useAuth(); // Fetch sessions

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  if (isLoading || sessionLoading) return <Spinner />;

  const currentUserId = users.find((u) => u.userName === session.username);

  return (
    <Container className="flex h-screen bg-gray-100">
      <ChatSidebar
        users={users}
        onUserSelect={handleUserSelect}
        selectedUser={selectedUser}
      />

      {selectedUser ? (
        <ChatContainer
          senderId={currentUserId._id}
          receiverId={selectedUser._id}
          token={session?.token}
        />
      ) : (
        <div className="flex items-center justify-center w-full text-gray-500">
          Select a user to start chatting
        </div>
      )}
    </Container>
  );
};

export default ChatPage;
