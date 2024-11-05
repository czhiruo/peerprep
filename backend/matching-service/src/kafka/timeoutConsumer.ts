import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import redis from '../redisClient';

const kafka = new Kafka({
    clientId: 'match-timeout-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'match-timeout-group' });
const usersToSocketsKey = 'usersToSockets';

export async function connectTimeoutConsumer(io: any): Promise<void> { 
    await consumer.connect();
    console.log('Timeout Consumer connected');

    await consumer.subscribe({ topic: 'match-timeout', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            const timeoutUser = JSON.parse(message.value?.toString()!);
            console.log();
            console.log("-----------------------[MATCH_TIMEOUT_CONSUMER]----------------------");
            console.log(timeoutUser);
            console.log('---------------------------------------------------------------------');
            console.log();
            const socketId = await redis.hget(usersToSocketsKey, timeoutUser.userId);
            if (socketId) {
                io.to(socketId).emit('match-timeout', timeoutUser);
            }
        },
    });
}

export async function disconnectTimeoutConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Timeout Consumer disconnected');
}
