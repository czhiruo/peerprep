import { fetchHistory } from "../models/historyModel";

export const loadHistoryData = async (setters, userId, start, end) => {
  const { questions, totalQuestions } = await fetchHistory(userId, start, end);
  return { questions, totalQuestions}
};

