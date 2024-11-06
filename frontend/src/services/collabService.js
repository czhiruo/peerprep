import io from 'socket.io-client';

const socket = io('http://localhost:8888');

const collabService = {
  register: (username) => {
    return new Promise((resolve, reject) => {
      socket.emit('register', username, (response) => {
        if (!response.success) {
          console.error('Error registering user:', response.error);
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  },

  disconnect: (username) => {
    socket.emit('disconnect-collab');
  },

  getRoomDetails: (roomId) => {
    return new Promise((resolve, reject) => {
      socket.emit('get-room-details', roomId, (response) => {
        if (!response.success) {
          console.error('Error getting room details:', response.error);
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  },

  getRoomId: (username) => {
    return new Promise((resolve, reject) => {
      socket.emit('get-roomId-from-username', username, (response) => {
        if (!response.success) {
          console.error('Error getting room ID:', response.error);
          reject(new Error(response.error));
        } else {
          resolve(response.roomId);
        }
      });
    });
  },

  sendCode: (code) => {
    socket.emit('code-change', code);
  },

  onCodeChange: (callback) => {
    socket.on('code-change', (code) => {
      callback(code);
    });
  },

  onOtherUserDisconnect: (callback) => {
    socket.on('other-user-disconnect', () => {
      callback();
    });
  },

  // New method to send chat messages
  sendChatMessage: (message) => {
    socket.emit('chat-message', message);
  },

  // New method to receive chat messages
  onChatMessage: (callback) => {
    socket.on('chat-message', (data) => {
      callback(data);
    });
  },
};

export default collabService;
