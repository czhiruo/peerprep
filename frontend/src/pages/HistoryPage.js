import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttemptedQuestions } from '../services/userService';
import { getData } from '../services/questionService';

function HistoryComponent() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Retrieve questionId and attemptedAt from the user service
        const { data } = await getAttemptedQuestions(userId);
        // format of questionPartialInfo: [{ questionId, attemptedAt }, ...]
        const questionPartialInfo = data.attemptedQuestions;

        for (const partialInfo of questionPartialInfo) {
          const question = {};

          // Retrieve question title, difficulty, and topics from the question service
          const questionData = await getData(`/${partialInfo.questionId}`);
          if (questionData) {
            question.title = questionData.title;
            question.difficulty = questionData.d;
            question.topics = questionData.c;
          } else {
            question.title = "Unknown";
            question.difficulty = "Unknown";
            question.topics = ["Unknown"];
          }

          question.attemptedAt = partialInfo.attemptedAt;
          question.questionId = partialInfo.questionId;
          
          setQuestions((prevQuestions) => [...prevQuestions, question]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col items-center justify-start bg-[#1a1a1a] px-2">
      <h2 className="w-full text-center text-white text-4xl font-bold">
        History
      </h2>
      <div className="form-control w-full bg-transparent no-border">
        <input
          type="text"
          className="input input-bordered w-full bg-[#1a1a1a] text-white border-[#5b5b5b] placeholder:text-[#a6a6a6]"
          placeholder="Search History"
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-5 items-center border-b border-[#5b5b5b] bg-white/5 h-10">
          <div className="text-white text-xs font-semibold text-center">Question Number</div>
          <div className="text-white text-xs font-semibold text-center">Title</div>
          <div className="text-white text-xs font-semibold text-center">Difficulty</div>
          <div className="text-white text-xs font-semibold text-center">Topics</div>
          <div className="text-white text-xs font-semibold text-center">Date/Time of Attempt</div>
        </div>

        { questions.map((question) => (
          <HistoryRow
            key={ question._id }
            questionId={ question.questionId }
            title={ question.title }
            difficulty={ question.difficulty }
            topics={ question.topics }
            attemptTime={ question.attemptedAt }
          />
        )) }

      </div>
    </div>
  );
};

function HistoryRow({ questionId, title, difficulty, topics, attemptTime }) {
  console.log(topics)

  return (
    <div className="grid grid-cols-5 items-center border-b border-[#5b5b5b] h-10">
    <div className="text-white text-xs text-center">{ questionId }</div>
    <div className="text-white text-xs text-center">{ title }</div>
    <div className="text-[#f9ff00] text-xs text-center">{ difficulty }</div>
    <div className="flex justify-center">
      { topics.map((topic) => (
        <span key={ topic } className="badge badge-secondary">{ topic }</span>
      )) }
    </div>
    <div className="text-white text-xs text-center">{ attemptTime }</div>
  </div>
  )
}

export default HistoryComponent;
