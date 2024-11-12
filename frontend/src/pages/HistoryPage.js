import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { loadHistoryData } from '../controllers/historyController';

function HistoryComponent() {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    const setters = {
      setLoading,
      setQuestions
    }

    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get('p'), 10);
    
    // If p is not given, default to 1
    const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    setPage(currentPage);

    const start = (currentPage - 1) * questionsPerPage;
    const end = start + questionsPerPage;

    setLoading(true)
    loadHistoryData(setters, userId, start, end)
      .then(({ questions, totalQuestions }) => {
        setQuestions(questions);
        setNumPages(Math.ceil(totalQuestions / questionsPerPage));
      })
      .catch((error) => {
        console.error("Failed to load history data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, location.search, questions.length]);

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
          <div className="text-white text-xs font-semibold text-center">Question No.</div>
          <div className="text-white text-xs font-semibold text-center">Title</div>
          <div className="text-white text-xs font-semibold text-center">Difficulty</div>
          <div className="text-white text-xs font-semibold text-center">Topics</div>
          <div className="text-white text-xs font-semibold text-center">Date/Time of Attempt</div>
        </div>

        { questions.map((question) => (
            <HistoryRow
              key={ question._id }
              index={ question.index }
              title={ question.title }
              difficulty={ question.difficulty }
              topics={ question.topics }
              attemptTime={ question.attemptedAt }
            />
          ))}
      </div>

      {/* Pagination */}
      <div className="join">
        {Array.from({ length: numPages }, (_, i) => (
          <button
            key={i}
            className={`join-item btn ${page === i + 1 ? 'btn-active text-primary' : 'text-white'}`}
            onClick={() => navigate(`?p=${i + 1}`)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

function HistoryRow({ index, title, difficulty, topics, attemptTime }) {
  const difficultyColorMap = {
    easy: 'text-[#1a8754]',
    medium: 'text-[#ffc008]',
    hard: 'text-[#ff403f]',
    default: 'text-white'
  }

  const difficultyColor = difficultyColorMap[difficulty.toLowerCase()] || difficultyColorMap.default;

  return (
  <div className="grid grid-cols-5 items-center border-b border-[#5b5b5b] h-10">
    <div className="text-white text-xs text-center">{ index }</div>
    <div className="text-white text-xs text-center">{ title }</div>
    <div className={`${difficultyColor} text-xs text-center`}>{ difficulty }</div>
    <div className="flex justify-center space-x-2">
      { topics.map((topic) => (
        <span key={ topic } className="badge badge-secondary">{ topic }</span>
      )) }
    </div>
    <div className="text-white text-xs text-center">{ attemptTime }</div>
  </div>
  )
}

export default HistoryComponent;
