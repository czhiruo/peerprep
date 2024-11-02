// Websocket interface for frontend to connect 

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectProducer, sendMessage } from './kafka/producer';
import { connectRoomConsumer } from './kafka/roomConsumer';
import { connectCodeConsumer } from './kafka/codeConsumer';
import { roomManager } from './models/room';
import redis from './redisClient';

const app = express();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

const usersToSocketsKey = 'usersToSockets';
const socketsToUsersKey = 'socketsToUsers';


io.on('connection', (socket) => {
  console.log('A user connected to socket:', socket.id);

  socket.on('register', async (userId: string, callback) => {
    const existingSocketId = await redis.hget(usersToSocketsKey, userId);
    if (existingSocketId) {
      console.log('User already registered:', userId);
      callback({ success: false, error: `User ${userId} is already registered` });
      return;
    }

    await redis.hset(usersToSocketsKey, userId, socket.id);
    await redis.hset(socketsToUsersKey, socket.id, userId);
    console.log('User registered:', userId);
    callback({ success: true });
  });

  socket.on('code-change', async (code: string) => {
    const username = await redis.hget(socketsToUsersKey, socket.id);
    if (!username) {
      console.log('User not registered');
      return;
    }

    await sendMessage('collab-code', { key: username, value: code });
  });

  socket.on('get-room-details', async (roomId: string, callback) => {
    const room = await roomManager.getRoom(roomId);
    if (!room) {
      callback({ success: false, error: `Room ${roomId} does not exist` });
      return;
    }
    callback({ success: true, users: room.users, question: room.question, code: room.code, language: room.language });
  });

  socket.on('get-roomId-from-username', async (username: string, callback) => {
    const roomId = await roomManager.getRoomId(username);
    if (!roomId) {
      callback({ success: false, error: `User ${username} is not in any room` });
      return;
    }
    callback({ success: true, roomId });
  });

  // Remove socket ID from map when user disconnects
  socket.on('disconnect', () => {
    redis.hget(socketsToUsersKey, socket.id)
      .then((userId) => {
        if (userId) {
          redis.hdel(socketsToUsersKey, socket.id);
          redis.hdel(usersToSocketsKey, userId);
          console.log('User removed:', userId);
        }
      });
  });
});

const startServer = async () => {
  try {
    await connectProducer();

    await connectRoomConsumer();
    await connectCodeConsumer(io);

    const PORT = 8888;
    httpServer.listen(PORT, () => {
      console.log('Collab service is running on port', PORT);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
