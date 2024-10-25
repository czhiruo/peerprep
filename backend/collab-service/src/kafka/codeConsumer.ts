// Handles the code changes sent by one user and sends them to the other user in the room

import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { roomManager } from '../models/room';

const kafka = new Kafka({
    clientId: 'collab-code-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'collab-code-group' });

export async function connectCodeConsumer(
  io: any,
  userSocketMap: Map<string, string>
): Promise<void> {
    await consumer.connect();
    console.log('Code consumer connected');
    await consumer.subscribe({ topic: 'collab-code', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            if (topic !== 'collab-code') return;
            
            const username = message.key?.toString()!;
            const code: string = JSON.parse(message.value?.toString()!);
            const otherUser = roomManager.getOtherUser(username);
            const otherUserSocketId = userSocketMap.get(otherUser);

            console.log(`Received code change from ${username}`);

            // Send the code change to the other user
            if (otherUserSocketId) {
                console.log(`Sending code change to ${otherUser}`);
                io.to(otherUserSocketId).emit('code-change', code);
            }
        },
    });
}