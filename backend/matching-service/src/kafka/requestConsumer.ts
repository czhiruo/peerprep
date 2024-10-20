import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { Difficulty, MatchRequest, MatchStatus } from '../models/matchRequest';
import { MatchResult } from '../models/matchResult';
import { attemptMatch } from '../services/matchingService';
import { MatchingPools } from '../services/matchingPools';
import { connectProducer, sendMessage } from './producer';

const kafka = new Kafka({
    clientId: 'matching-service-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'matching-service-group' });
  
export async function connectRequestConsumer(
    io: any,
    userSocketMap: Map<string, string>
  ): Promise<void> {
    await consumer.connect();
    console.log('Match Request Consumer connected');
    
    await consumer.subscribe({ topic: 'matching-requests', fromBeginning: true });
    const matchingPools = MatchingPools.getInstance();
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        if (topic === 'matching-requests') {
          console.log({
            "[CONSUMER]":
            topic,
            partition,
            key: message.key?.toString(), // Check for possible undefined
            value: message.value?.toString(), // Check for possible undefined
          });
          const matchRequestData: Partial<MatchRequest> = JSON.parse(
            message.value?.toString()!
          );
          // console.log("MATCHING_REQUEST_DATA")
          // console.log(matchRequestData);
          const matchRequest: MatchRequest = {
            userId: matchRequestData.userId!,
            topics: Array.isArray(matchRequestData.topics) ? matchRequestData.topics : [],
            difficulties: Array.isArray(matchRequestData.difficulties) ? matchRequestData.difficulties.map((difficulty: string) => {
              switch (difficulty) {
                case 'easy':
                  return Difficulty.Easy;
                case 'medium':
                  return Difficulty.Medium;
                case 'hard':
                  return Difficulty.Hard;
                default:
                  throw new Error('Invalid difficulty');
              }
            }) : [],
            languages: Array.isArray(matchRequestData.languages) ? matchRequestData.languages : [],
            requestTime: typeof matchRequestData.requestTime === 'number' ? matchRequestData.requestTime : Date.now(),
            status: MatchStatus.Finding,
          };
          console.log("--------------------[MATCHING_REQUEST_CONSUMER]----------------------")
          console.log(matchRequest);
          console.log('---------------------------------------------------------------------');
          console.log();
          // Enqueue the UserRequest into the matching pools
          matchingPools.enqueueMatchRequest(matchRequest);
  
          // Attempt to find a match
          attemptMatch(matchRequest);
  
        }
      },
    });
  }

export async function disconnectRequestConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Request Consumer disconnected');
}
