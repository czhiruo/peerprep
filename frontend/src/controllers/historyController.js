import { fetchHistory } from "../models/historyModel";

export const loadHistoryData = async (setters, userId) => {
  setters.setLoading(true);
  try {
    const questions = await fetchHistory(userId);
    setters.setQuestions(questions);
  } catch (error) {
    console.error("Failed to load history data:", error);
  } finally {
    setters.setLoading(false);
  }
};
