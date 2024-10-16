import React from 'react';

function HistoryComponent() {
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

        {/* First Row */}
        <div className="grid grid-cols-5 items-center border-b border-[#5b5b5b] h-10">
          <div className="text-white text-xs text-center">9</div>
          <div className="text-white text-xs text-center">Course Schedule</div>
          <div className="text-[#f9ff00] text-xs text-center">Medium</div>
          <div className="flex justify-center">
            <span className="badge badge-secondary">Data Structures</span>
          </div>
          <div className="text-white text-xs text-center">10 Sep 2024 10:40 PM</div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-5 items-center border-b border-[#5b5b5b] h-10">
          <div className="text-white text-xs text-center">1</div>
          <div className="text-white text-xs text-center">Reverse a String</div>
          <div className="text-[#05ff00] text-xs text-center">Easy</div>
          <div className="flex flex-row justify-center gap-2">
            <span className="badge badge-secondary">Strings</span>
            <span className="badge badge-secondary">Algorithms</span>
          </div>
          <div className="text-white text-xs text-center">10 Sep 2024 9:40 PM</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
