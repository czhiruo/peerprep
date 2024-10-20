import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'matching-results-consumer',
    brokers: ['localhost:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'matching-results-group' });

export async function connectResultConsumer(
    io: any,
    userSocketMap: Map<string, string>
): Promise<void> { 
    await consumer.connect();
    console.log('Result Consumer connected');

    await consumer.subscribe({ topic: 'matching-results', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        console.log({
            "[CONSUMER - MatchingResult]":
            topic,
            partition,
            key: message.key?.toString(), // Check for possible undefined
            value: message.value?.toString(), // Check for possible undefined
        });
        const matchResult = JSON.parse(message.value?.toString()!);
        const { userId, matchUserId } = matchResult;
        const socketId = userSocketMap.get(userId);
        if (socketId) {
            io.to(socketId).emit('match-result', matchResult);
        }},
    });
}

export async function disconnectResultConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Result Consumer disconnected');
}
