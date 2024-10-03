import React, { useState } from 'react';

function SelectComplexityPage() {
  const [selectedDifficulties, setSelectedDifficulties] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty], // Toggle the selected state
    }));
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-center items-center">
      <div className="flex-grow flex flex-col justify-start items-center gap-[30px]">

        {/* Title Section */}
        <div className="text-white text-[40px] font-bold text-center">
          Select Difficulty
        </div>

        {/* Difficulty Options Section */}
        <div className="flex-grow flex flex-col justify-start items-center gap-[30px]">
          <div 
            onClick={() => toggleDifficulty('easy')}
            className={`self-stretch h-[80px] px-5 py-2.5 rounded-[20px] 
              border ${selectedDifficulties.easy ? 'border-[#39ff14] bg-[#39ff14]' : 'border-[#39ff14]'}
              transition-all duration-300 ease-in-out
              hover:border-[#39ff14] hover:shadow-md hover:shadow-[#39ff14] hover:scale-105 hover:transition-all cursor-pointer`}
          >
            <div className="text-white text-xl font-semibold font-['Inter'] leading-normal">Easy</div>
            <div className="w-full h-[49px] text-white text-[15px] font-normal font-['Inter'] leading-[18px]">
              Problems that focus on basic algorithms and data structures, often requiring simple logic and implementation.
            </div>
          </div>

          <div 
            onClick={() => toggleDifficulty('medium')}
            className={`self-stretch h-[80px] px-5 py-2.5 rounded-[20px] 
              border ${selectedDifficulties.medium ? 'border-[e3e300] bg-[#e3e300]' : 'border-[#e3e300]'}
              transition-all duration-300 ease-in-out
              hover:border-[#eaff00] hover:shadow-md hover:shadow-[#eaff00] hover:scale-105 hover:transition-all cursor-pointer`}
          >
            <div className="text-white text-xl font-semibold font-['Inter'] leading-normal">Medium</div>
            <div className="w-full h-[50px] text-white text-[15px] font-normal font-['Inter'] leading-[18px]">
              Problems that require more complex logic, multiple data structures, or algorithmic optimizations.
            </div>
          </div>

          <div 
            onClick={() => toggleDifficulty('hard')}
            className={`self-stretch h-[80px] px-5 py-2.5 rounded-[20px] 
              border ${selectedDifficulties.hard ? 'border-[#ff0000] bg-[#ff0000]' : 'border-[#ff0000]'}
              transition-all duration-300 ease-in-out
              hover:border-[#ff0000] hover:shadow-md hover:shadow-[#ff0000] hover:scale-105 hover:transition-all cursor-pointer`}
          >
            <div className="text-white text-xl font-semibold font-['Inter'] leading-normal">Hard</div>
            <div className="w-full h-[49px] text-white text-[15px] font-normal font-['Inter'] leading-[18px]">
              Problems that involve advanced algorithms, dynamic programming, or intricate mathematical insights, often with edge cases.
            </div>
          </div>

          <button
            className="w-full h-[60px] bg-[#282828] rounded-[20px] flex justify-center items-center"
          >
            <div className="text-white text-xl font-semibold font-['Inter'] leading-normal">Next</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectComplexityPage;
