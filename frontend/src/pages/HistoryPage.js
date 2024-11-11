import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadHistoryData } from '../controllers/historyController';

function HistoryComponent() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const setters = {
      setLoading,
      setQuestions
    }

    loadHistoryData(setters, userId);
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
  const difficultyColorMap = {
    easy: 'text-[#1a8754]',
    medium: 'text-[#ffc008]',
    hard: 'text-[#ff403f]',
  }

  const difficultyColor = difficultyColorMap[difficulty.toLowerCase()];

  return (
    <div className="grid grid-cols-5 items-center border-b border-[#5b5b5b] h-10">
    <div className="text-white text-xs text-center">{ questionId }</div>
    <div className="text-white text-xs text-center">{ title }</div>
    <div className={`${difficultyColor} text-xs text-center`}>{ difficulty }</div>
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
