import io from 'socket.io-client';

const socket = io('http://localhost:8081');

const socketService = {
  register: (username) => {
    socket.emit('register', username);
  },

  sendMatchRequest: (matchRequest) => {
    socket.emit('matching-request', matchRequest);
  },

  sendMatchCancel: (matchRequest) => {
    console.log('Cancelling match request:', matchRequest);
    socket.emit('match-cancel', matchRequest);
  },

  onMatchResult: (callback) => {
    socket.on('match-result', callback);
  },

  onMatchTimeout: (callback) => {
    socket.on('match-timeout', callback);
  },
};

export default socketService;
