import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--color-theme-200);

  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);
`;

const MessagesContainer = styled.div`
  width: 100%;
  background-color: var(--color-theme-200);
  padding: 1rem;

  color: var(--color-grey-800);
`;

const Message = styled.div`
  padding: 0.5rem 1rem;
`;

const Content = styled.div`
  background-color: var(--color-theme-300);
  border-radius: 2rem;
  padding: 1rem;
`;

const ChatContainer = ({ senderId, receiverId, token }) => {
  const [messages, setMessages] = useState([]); // State to hold messages
  const [messageContent, setMessageContent] = useState(''); // Input state

  // Initialize socket connection with headers
  const socket = io('http://localhost:3030', {
    auth: { token: `Bearer ${token} `, tenantId: 'b_1' },
    transports: ['websocket'], // Ensure WebSocket transport is used
  });

  // Ref for the chat messages container
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // On successful connection
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Fetch initial messages
    socket.emit('getMessages', { senderId, receiverId }, (initialMessages) => {
      setMessages(initialMessages || []);
    });

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error.message);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });

    // Cleanup WebSocket connection
    return () => {
      socket.disconnect();
    };
  }, [socket, senderId, receiverId]);

  // Handle message sending
  const handleSendMessage = () => {
    if (!messageContent.trim()) return; // Avoid sending empty messages

    socket.emit(
      'sendMessage',
      { senderId, receiverId, content: messageContent },
      (ackMessage) => {
        setMessages((prevMessages) => [...prevMessages, ackMessage]); // Add sent message with acknowledgment
      },
    );
    setMessageContent(''); // Clear input field
    scrollToBottom();
  };

  return (
    <Container>
      {/* Chat Messages */}
      <MessagesContainer
        ref={messagesContainerRef} // Attach the ref to the container
        className="overflow-y-auto"
      >
        {messages?.map((msg, index) => (
          <Message
            key={index}
            className={`flex ${
              msg.senderId === senderId ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div className="flex flex-col">
              <Content
                className={` ${
                  msg.senderId === senderId
                    ? 'bg-blue-500 text-right'
                    : 'bg-gray-300 text-left'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </Content>
              <span
                className={`block text-xs mt-1 text-gray-200 flex ${msg.senderId === senderId ? 'justify-end' : 'justify-start'}`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </Message>
        ))}
      </MessagesContainer>

      {/* Message Input with Send Button */}
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
};

export default ChatContainer;
