import { getAttemptedQuestions } from "../services/userService";
import { getData } from "../services/questionService";
import { capitalizeFirstLetter, formatDate } from "../commons/utils";

export const fetchHistory = async (userId) => {
  // Retrieve questionId and attemptedAt from the user service
  const { data } = await getAttemptedQuestions(userId);
  // format of questionPartialInfo: [{ questionId, attemptedAt }, ...]
  const questionPartialInfo = data.attemptedQuestions;
  
  const questions = []
  for (const partialInfo of questionPartialInfo) {
    const question = {};

    // Retrieve question title, difficulty, and topics from the question service
    try {
      const questionData = await getData(`/${partialInfo.questionId}`);
      if (questionData) {
        question.title = questionData.title;
        question.difficulty = capitalizeFirstLetter(questionData.d);
        question.topics = questionData.c;
      } else {
        question.title = "Unknown";
        question.difficulty = "Unknown";
        question.topics = ["Unknown"];
      }
  
      question.attemptedAt = formatDate(partialInfo.attemptedAt);
      question.questionId = partialInfo.questionId;
      
      questions.push(question);
    } catch (error) {
      console.error("Failed to fetch question ", partialInfo.questionId);
    }
  }

  return questions
}