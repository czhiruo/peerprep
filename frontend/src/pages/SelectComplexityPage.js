import React from 'react';
import { Link } from 'react-router-dom';

function SelectComplexityPage({ difficulties, setDifficulties }) {
  const toggleDifficulty = (difficulty) => {
    setDifficulties((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty], // Toggle the selected state
    }));
  };

  return (
    <div className="min-h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-center gap-4">
        {/* Title Section */}
        <div className="text-white text-4xl font-bold text-center">
          Select Difficulty
        </div>

        {/* Difficulty Options */}
        <div className="grid grid-cols-1 gap-2">
          <div
            onClick={() => toggleDifficulty('easy')}
            className={`self-stretch p-3 border rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
              ${difficulties.easy ? 'bg-success' : ''} hover:scale-105`}
          >
            <div className="text-white text-xl font-semibold">Easy</div>
            <div className="text-white text-sm mt-2">
              Problems that focus on basic algorithms and data structures, often requiring simple logic and implementation.
            </div>
          </div>

          <div
            onClick={() => toggleDifficulty('medium')}
            className={`self-stretch p-3 border rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
              ${difficulties.medium ? 'bg-warning' : ''} hover:scale-105`}
          >
            <div className="text-white text-xl font-semibold">Medium</div>
            <div className="text-white text-sm mt-2">
              Problems that require more complex logic, multiple data structures, or algorithmic optimizations.
            </div>
          </div>

          <div
            onClick={() => toggleDifficulty('hard')}
            className={`self-stretch p-3 border rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
              ${difficulties.hard ? 'bg-error' : ''} 
              hover:shadow-lg hover:scale-105`}
          >
            <div className="text-white text-xl font-semibold">Hard</div>
            <div className="text-white text-sm mt-2">
              Problems that involve advanced algorithms, dynamic programming, or intricate mathematical insights, often with edge cases.
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <Link to="/topic">
            <button className="btn btn-secondary">
              Back
            </button>
          </Link>
          <Link to="/language">
            <button className="btn btn-primary">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectComplexityPage;
