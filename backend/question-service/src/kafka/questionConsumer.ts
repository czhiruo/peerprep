import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { sendMessage } from './producer.js';
import { convertToQuestions, getQuestionsByFilter, getRandomQuestion } from '../services/questionService.js';
import { Question } from '../models/question.js';

const kafka = new Kafka({
    clientId: 'generate-question-consumer',
    brokers: ['kafka:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'generate-question-group' });

export async function connectQuestionConsumer(
    io: any,
    userSocketMap: Map<string, string>
): Promise<void> { 
    await consumer.connect();
    console.log('Question Consumer connected');

    await consumer.subscribe({ topic: 'generate-question', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            console.log("Hello from question consumer.")
            const collabRequest = JSON.parse(message.value?.toString()!);
            console.log("collabRequest = ", collabRequest)
            const { userId1, userId2, interestTopic, difficulty, language } = collabRequest;
            console.log('userId1 = ', userId1);
            console.log('userId2 = ', userId2);
            console.log('interestTopic = ', interestTopic);
            console.log('difficulty = ', difficulty);
            console.log('language = ', language);
            const filters = await getQuestionsByFilter(interestTopic, difficulty) || [];
            console.log('filers = ', filters);
            const questions: Question[] = convertToQuestions(filters);
            console.log('questions = ', questions);
            const question = getRandomQuestion(questions);
            console.log('question = ', question);
            if (question) {
                console.log("Hello, sending data to collab room.");
                sendMessage('collab-room', { key: 'room', value: {
                    users: [userId1, userId2],
                    question: question, 
                    language: language
                }});
            // const socketId1 = userSocketMap.get(userId1);
            // const socketId2 = userSocketMap.get(userId2);
            // if (socketId1) {
            //     io.to(socketId1).emit('open-collab-room', true);
            // }
            // if (socketId2) {
            //     io.to(socketId2).emit('open-collab-room', true);
            // }

            
            console.log();
            console.log("---------------------[QUESTION_CONSUMER]----------------------")
            console.log(collabRequest);
            console.log(question);
            console.log(language);
            console.log('---------------------------------------------------------------------');
            console.log();


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
            }
        },        
    });
}

export async function disconnectQuestionConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Question Consumer disconnected');
}
