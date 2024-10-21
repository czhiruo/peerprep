import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'match-timeout-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'match-timeout-group' });

export async function connectTimeoutConsumer(
    io: any,
    userSocketMap: Map<string, string>
): Promise<void> { 
    await consumer.connect();
    console.log('Timeout Consumer connected');

    await consumer.subscribe({ topic: 'match-timeout', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        // console.log({
        //     "[CONSUMER]":
        //     topic,
        //     partition,
        //     key: message.key?.toString(), // Check for possible undefined
        //     value: message.value?.toString(), // Check for possible undefined
        // });
        
        const timeoutUser = JSON.parse(message.value?.toString()!);
        console.log();
        console.log("-----------------------[MATCH_TIMEOUT_CONSUMER]----------------------");
        console.log(timeoutUser);
        console.log('---------------------------------------------------------------------');
        console.log();
        const socketId = userSocketMap.get(timeoutUser.userId);
        if (socketId) {
            io.to(socketId).emit('match-timeout', timeoutUser);
        }},
    });
}

export async function disconnectTimeoutConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Timeout Consumer disconnected');
}
