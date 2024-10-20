import { Server } from 'socket.io';
import { createServer } from 'http';
import { MatchRequest } from './models/matchRequest';
import { attemptMatch } from './services/matchingService';
import { connectProducer, sendMessage } from './kafka/producer';
import dotenv from 'dotenv';
import { connectRequestConsumer } from './kafka/requestConsumer';
import { adminInit } from './kafka/admin';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

dotenv.config();

const kafkaBrokers = process.env.KAFKA_BROKERS 
  ? process.env.KAFKA_BROKERS.split(',') 
  : ['localhost:9092'];

// create HTTP server
const httpServer = createServer(app);

// Initialise Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Update this to match your frontend port
    methods: ["GET", "POST"]
  }
});

// Map to store the user ID and socket ID
// enables the server to send messages to specific users
const userSocketMap = new Map<string, string>();

io.on('connection', (socket) => {
  console.log('A user connected to socket:', socket.id);

  // Register user with their socket ID
  socket.on('register', (userId: string) => {
    userSocketMap.set(userId, socket.id);
    console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  });

  // Handle matching requests
  socket.on('matching-request', async (matchRequest: MatchRequest) => {
    // Process the matching request
    // For example, send it to Kafka topic 'matching-requests'
    // You'll need to implement sendMessage in your producer
    await sendMessage('matching-requests', { key: matchRequest.userId, value: matchRequest});
  });

  // Handle match cancellation
  socket.on('match-cancel', async (matchRequest: MatchRequest) => {
    await sendMessage('match-canceled', { key: matchRequest.userId, value: matchRequest});
  });

  // Handle disconnections
  // clean up the userSocketMap when a client disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from the map
    for (const [userId, sId] of userSocketMap.entries()) {
      if (sId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

// Function to start the server
const startServer = async () => {
  try {
    adminInit().catch(console.error);
    // Connect to Kafka producer
    await connectProducer();

    // Start the Kafka consumer and matching service
    await connectRequestConsumer(io, userSocketMap);
  
    // Start the WebSocket server
    const PORT = 8081;
    httpServer.listen(PORT, () => {
      console.log('Matching service is running on port', PORT);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();