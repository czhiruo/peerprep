import { Kafka, Admin } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'matching-service-admin',
  brokers: ['localhost:9092'],
});

const admin: Admin = kafka.admin();

export async function adminInit(): Promise<void> {
  
  await admin.connect();
  console.log('Admin connected');

  const result1 = await admin.createTopics({
    waitForLeaders: true,
    topics: [
      { topic: 'matching-requests', numPartitions: 3, replicationFactor: 1 },
      { topic: 'matching-results', numPartitions: 3, replicationFactor: 1 },
      { topic: 'match-canceled', numPartitions: 3, replicationFactor: 1 },
      { topic: 'match-timeout', numPartitions: 3, replicationFactor: 1 },
    ],
  });
  console.log(`Topic creation result: ${result1}`);

  const topics = await admin.listTopics();
  console.log('Existing topics:', topics);
  await admin.disconnect();
  console.log('Admin disconnected');
}

