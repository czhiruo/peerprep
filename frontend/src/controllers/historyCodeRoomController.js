import { getAttemptedQuestionById } from "../services/userService";
import { getData } from "../services/questionService";

export const getHistoryDetails = async (userId, attemptId) => {
  const { questionId, code, language } = await getAttemptedQuestionById(userId, attemptId);
  const questionData = await getData(`/${questionId}`);

  return {
    questionTitle: questionData.title,
    questionCategory: questionData.c,
    questionComplexity: questionData.d,
    questionDescription: questionData.desc,
    attemptCode: code,
    attemptLanguage: language
  }
}