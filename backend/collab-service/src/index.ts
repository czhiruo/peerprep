// Websocket interface for frontend to connect 

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectProducer, sendMessage } from './kafka/producer';
import { connectRoomConsumer } from './kafka/roomConsumer';
import { connectCodeConsumer } from './kafka/codeConsumer';

const app = express();
const userToSocketMap = new Map<string, string>();
const socketToUserMap = new Map<string, string>();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('A user connected to socket:', socket.id);

  socket.on('register', (userId: string) => {
    userToSocketMap.set(userId, socket.id);
    socketToUserMap.set(socket.id, userId);
    console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  });

  socket.on('code-change', async (code: string) => {
    const username = socketToUserMap.get(socket.id);
    if (!username) {
      console.log('User not registered');
      return;
    }

    await sendMessage('collab-code', { key: username, value: code });
  });

  // Remove socket ID from map when user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const [userId, sId] of userToSocketMap.entries()) {
      if (sId === socket.id) {
        userToSocketMap.delete(userId);
        socketToUserMap.delete(socket.id);
        break;
      }
    }
  });
});

const startServer = async () => {
  try {
    await connectProducer();

    await connectRoomConsumer();
    await connectCodeConsumer(io, userToSocketMap);

    const PORT = 8888;
    httpServer.listen(PORT, () => {
      console.log('Collab service is running on port', PORT);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
