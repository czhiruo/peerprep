import { Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'collab-service-producer',
    brokers: ['kafka:9092'],
});

const producer: Producer = kafka.producer();

export async function connectProducer(): Promise<void> {
    await producer.connect();    
    console.log('Producer connected');
}

export async function sendMessage(topic: string, message: { key: string; value: any }): Promise<void> {
    await producer.send({
        topic,
        messages: [{ key: message.key, value: JSON.stringify(message.value) }],
    });
}

export async function disconnectProducer(): Promise<void> {
    await producer.disconnect();
    console.log('Producer disconnected');
}
