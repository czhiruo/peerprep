// Handles the code changes sent by one user and sends them to the other user in the room

import { Kafka, Consumer, EachMessagePayload, logLevel } from 'kafkajs';
import { roomManager } from '../services/roomManager';
import redis from '../redisClient';

const kafka = new Kafka({
    clientId: 'collab-language-consumer',
    brokers: ['kafka:9092'],
    logLevel: logLevel.ERROR,
    retry: {
      retries: 10,  // Increase retry count here
      initialRetryTime: 3000,  // Time (in ms) before the first retry
      factor: 0.2,  // Factor by which the retry time increases after each attempt
    },
});

const consumer: Consumer = kafka.consumer({ groupId: 'collab-language-group' });

const usersToSocketsKey = 'usersToSockets';

export async function connectLanguageConsumer(
  io: any,
): Promise<void> {
    await consumer.connect();
    console.log('Language consumer connected');
    await consumer.subscribe({ topic: 'collab-language', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            if (topic !== 'collab-language') return;
            
            const username = message.key?.toString()!;
            const language: string = JSON.parse(message.value?.toString()!);

            const roomId = await roomManager.getRoomId(username);
            if (!roomId) {
                console.log('User not in a room');
                return;
            }
            await roomManager.updateLanguage(roomId, language);

            const otherUser = await roomManager.getOtherUser(username);
            const otherUserSocketId = await redis.hget(usersToSocketsKey, otherUser);

            // Send the code change to the other user
            if (otherUserSocketId) {
                console.log(`Sending: ${username} -> ${otherUser}`);
                io.to(otherUserSocketId).emit('language-change', language);
            }
        },
    });
}