import React, { useState, useMemo, useCallback } from 'react';
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

  // Fetch users
  const { usersData: users, isLoading } = useListUser();

  // Auth-related data
  const {
    session,
    sessions,
    listSessions,
    isLoading: sessionLoading,
  } = useAuth();

  // Memoize `listSessions`
  const memoizedListSessions = useCallback(listSessions, [listSessions]);

  // Memoize `sessions`
  const memoizedSessions = useMemo(() => sessions, [sessions]);

  // Memoize `users`
  const memoizedUsers = useMemo(() => users, [users]);

  // Memoize `currentUser`
  const currentUser = useMemo(() => {
    return users?.find((user) => user.userName === session?.username);
  }, [users, session?.username]);

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  if (isLoading || sessionLoading) return <Spinner />;

  return (
    <Container className="flex h-screen bg-gray-100">
      <ChatSidebar
        users={memoizedUsers}
        onUserSelect={handleUserSelect}
        selectedUser={selectedUser}
        sessions={memoizedSessions}
        listSessions={memoizedListSessions}
      />

      {selectedUser ? (
        <ChatContainer
          senderId={currentUser?._id}
          receiverId={selectedUser?._id}
          token={session?.token}
          receiver={selectedUser}
          sender={currentUser}
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
