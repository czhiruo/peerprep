import React from 'react';

function LoadingPage() {
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col items-center justify-center bg-[#1a1a1a]">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-[#5b5b5b] rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingPage;