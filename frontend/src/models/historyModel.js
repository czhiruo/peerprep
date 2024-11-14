import { getAttemptedQuestions } from "../services/userService";
import { getData } from "../services/questionService";
import { capitalizeFirstLetter, formatDate } from "../commons/utils";

export const fetchHistory = async (userId, start, end) => {
  // Retrieve questionId and attemptedAt from the user service
  const { data } = await getAttemptedQuestions(userId);
  const allQuestions = data.attemptedQuestions.reverse(); // Show latest question first
  // format of questionPartialInfo: [{ questionId, attemptedAt }, ...]
  const questionPartialInfo = allQuestions.slice(start, end);
  
  const questions = []
  for (let i = 0; i < questionPartialInfo.length; i++) {
    const partialInfo = questionPartialInfo[i];
    const question = {
      index: start + i + 1,
      attemptId: partialInfo._id,
    };

    // Retrieve question title, difficulty, and topics from the question service
    try {
      const questionData = await getData(`/${partialInfo.questionId}`);
      if (questionData) {
        question.title = questionData.title;
        question.difficulty = capitalizeFirstLetter(questionData.d);
        question.topics = questionData.c;
      } else {
        question.title = "-";
        question.difficulty = "-";
        question.topics = ["-"];
      }
  
      question.attemptedAt = formatDate(partialInfo.attemptedAt);
      question.questionId = partialInfo.questionId;
      
    } catch (error) {
      console.error("Failed to fetch question ", partialInfo.questionId);
      question.title = "INVALID QUESTION";
      question.difficulty = "-";
      question.topics = [];
      question.attemptedAt = "-";
    }
    questions.push(question);
  }

  return {
    questions,
    totalQuestions: data.attemptedQuestions.length,
  }
}