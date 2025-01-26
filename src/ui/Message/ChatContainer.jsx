import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  initializeSocket,
  disconnectSocket,
} from '@/apis/communication/Message/hooks/socket.js';
import UserAvatar from '@/ui/User/UserAvatar.jsx';

// Message Status Mapping
export const roles = {
  name: 'status',
  items: [
    { id: '0', label: 'Sent', order: 0 },
    { id: '1', label: 'Delivered', order: 1 },
    { id: '2', label: 'Seen', order: 2 },
  ],
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-theme-200);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);
  height: 100%;
`;

const MessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-theme-200);
  padding: 1rem;
  overflow-y: auto;
  color: var(--color-grey-800);
`;

const DateSeparator = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-grey-600);
  margin: 1rem 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
  align-items: center;
  margin-bottom: 1rem;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: ${({ isSender }) => (isSender ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 0.5rem;
`;

const Text = styled.div`
  background-color: ${({ isSender }) =>
    isSender ? 'var(--color-theme-700)' : 'var(--color-theme-300)'};
  color: ${({ isSender }) => (isSender ? 'white' : 'var(--color-grey-800)')};
  padding: 1rem;
  border-radius: 2rem;
  text-align: ${({ isSender }) => (isSender ? 'right' : 'left')};
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
`;

const UserName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const TimeStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;

const ChatContainer = memo(
  ({ senderId, receiverId, token, sender, receiver }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      const socket = initializeSocket({
        token,
        tenantId: 'b_1',
        userId: senderId,
      });

      // Fetch initial messages
      socket.emit(
        'getMessages',
        { senderId, receiverId },
        (initialMessages) => {
          setMessages(initialMessages || []);
          scrollToBottom();
        },
      );

      // Listen for new messages
      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      });

      return () => {
        disconnectSocket(); // Cleanup WebSocket connection
      };
    }, [senderId, receiverId, token]);

    const handleSendMessage = () => {
      if (!messageContent.trim()) return;

      const socket = initializeSocket({ token, tenantId: 'b_1' });

      socket.emit(
        'sendMessage',
        { senderId, receiverId, content: messageContent },
        (ackMessage) => {
          setMessages((prevMessages) => [...prevMessages, ackMessage]);
          scrollToBottom();
        },
      );

      setMessageContent('');
    };

    // Helper function to check if a date is today
    const isToday = (date) => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    // Helper function to format the date
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      if (isToday(date)) {
        return 'Today';
      }
      return date.toLocaleDateString();
    };

    // Helper function to group messages by date
    const groupMessagesByDate = (messages) => {
      const groupedMessages = {};
      messages.forEach((msg) => {
        const date = formatDate(msg.timestamp);
        if (!groupedMessages[date]) {
          groupedMessages[date] = [];
        }
        groupedMessages[date].push(msg);
      });
      return groupedMessages;
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
      <Container>
        <MessagesContainer ref={messagesContainerRef}>
          {Object.keys(groupedMessages).map((date) => (
            <React.Fragment key={date}>
              <DateSeparator>{date}</DateSeparator>
              {groupedMessages[date].map((msg, index) => {
                const isSender = msg.senderId === senderId;
                const user = isSender ? sender : receiver;

                return (
                  <MessageWrapper key={index} isSender={isSender}>
                    <MessageContent isSender={isSender}>
                      {/* Avatar */}
                      <UserAvatar user={user} />

                      {/* Message and Name */}
                      <UserDetails isSender={isSender}>
                        <UserName>{`${user.personalInformation.name.first} ${user.personalInformation.name.last}`}</UserName>
                        <Text isSender={isSender}>
                          <p className="text-sm">{msg.content}</p>
                        </Text>
                        <TimeStatusWrapper isSender={isSender}>
                          <div>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                          {isSender && (
                            <div style={{ marginLeft: '0.5rem' }}>
                              |{' '}
                              {roles.items.find((s) => s.id === msg.status)
                                ?.label || ''}
                            </div>
                          )}
                        </TimeStatusWrapper>
                      </UserDetails>
                    </MessageContent>
                  </MessageWrapper>
                );
              })}
            </React.Fragment>
          ))}
        </MessagesContainer>
        <div className="flex mt-4 w-full">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 bg-blue-500 text-gray-700 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </Container>
    );
  },
);

export default ChatContainer;
