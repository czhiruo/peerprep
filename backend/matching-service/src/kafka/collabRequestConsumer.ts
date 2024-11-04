import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'collab-request-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'collab-request-group' });

export async function connectCollabRequestConsumer(
    io: any,
    userSocketMap: Map<string, string>
): Promise<void> { 
    await consumer.connect();
    console.log('Collab Request Consumer connected');

    await consumer.subscribe({ topic: 'collab-request', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const collabRoomData = JSON.parse(message.value?.toString()!);
        const { userId1, userId2, interestTopic, difficulty, language } = collabRoomData;
        console.log();
        console.log("-----------------------[COLLAB_REQUEST_CONSUMER]----------------------");
        console.log(collabRoomData);
        console.log('---------------------------------------------------------------------');
        console.log();
        }
    });
}

export async function disconnectRoomOpenConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Room Open Consumer disconnected');
}
