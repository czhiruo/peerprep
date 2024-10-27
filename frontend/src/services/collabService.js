import io from 'socket.io-client';

const socket = io('http://localhost:8888');

const collabService = {
  register: (username) => {
    socket.emit('register', username);
  },

  sendCode: (code) => {
    socket.emit('code-change', code);
  },

  onCodeChange: (callback) => {
    socket.on('code-change', (code) => {
      callback(code);
    });
  },
};

export default collabService;
