import { connectToDatabase } from '../config/database';
import { Question } from '../models/question';
import { ObjectId } from 'mongodb';

// Add a new question
export async function addQuestion(question: Omit<Question, 'questionId'>) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');
    const result = await collection.insertOne({ question });
    console.log('User inserted with _id:', result.insertedId);
    return result.insertedId;
}

// Read a question by ID
export async function getQuestionById(questionId: ObjectId) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');
    const question = await collection.findOne({ _id: questionId });
    return question;
}
  
// Update a question by ID
export async function updateQuestion(questionId: ObjectId, updatedQuestion: Partial<Question>) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');
    const result = await collection.updateOne({ _id: questionId }, { $set: updatedQuestion });
    return result.modifiedCount > 0;
}

// Delete a question by ID
export async function deleteQuestion(questionId: ObjectId) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');
    const result = await collection.deleteOne({ _id: questionId });
    return result.deletedCount > 0;
}