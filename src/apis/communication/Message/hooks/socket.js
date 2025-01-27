import { io } from 'socket.io-client';

let socket;

export const initializeSocket = ({ token, tenantId, userId }) => {
  if (!socket) {
    socket = io('http://localhost:3030', {
      auth: { token: `Bearer ${token}`, userId, tenantId },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error.message);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
