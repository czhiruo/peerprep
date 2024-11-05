import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { sendMessage } from './producer';
import redis from '../redisClient';

const kafka = new Kafka({
    clientId: 'matching-results-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'matching-results-group' });

export async function connectResultConsumer(io: any): Promise<void> { 
    await consumer.connect();
    console.log('Result Consumer connected');

    await consumer.subscribe({ topic: 'matching-results', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        if (topic === 'matching-results') {
            const matchResult = JSON.parse(message.value?.toString()!);
            
            console.log();
            console.log("---------------------[MATCHING_RESULT_CONSUMER]----------------------")
            console.log(matchResult);
            console.log('---------------------------------------------------------------------');
            console.log();

            const { userId, matchedUserId } = matchResult;
            const socketId1 = await redis.hget('usersToSockets', userId);
            const socketId2 = await redis.hget('usersToSockets', matchedUserId);
   

            console.log(`Sending match result to ${userId} and ${matchedUserId}`);

            if (socketId1) {
                io.to(socketId1).emit('match-result', matchResult);
            }

            const otherMatchResult = matchResult;
            otherMatchResult.userId = matchedUserId;
            otherMatchResult.matchedUserId = userId;

            if (socketId2) {
                io.to(socketId2).emit('match-result', otherMatchResult);
            }
            
            // sendMessage('collab-room', { key: 'room', value: {
            //     users: [userId, matchedUserId],
            //     question: {
            //         questionId: "1",
            //         questionTitle: "Test Question",
            //         questionDescription: "Test Description",
            //         questionCategory: ["Test"],
            //         questionComplexity: "Easy"
            //     },
            //     language: "python"
            // } }); // FOR DEBUGGING ONLY
        
        }},        
    });
}

export async function disconnectResultConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Result Consumer disconnected');
}
