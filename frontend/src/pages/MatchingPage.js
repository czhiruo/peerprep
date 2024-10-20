import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AvatarDisplay from '../components/AvatarDisplay';
import LoadingDots from '../components/LoadingDots';

function MatchingPage({ difficulties, topics, languages }) {
  const [time, setTime] = useState(30);
  const [matchingFailed, setMatchingFailed] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setMatchingFailed(true);
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const baseAvatarUrl = "https://avatar.iran.liara.run/public";

  if (matchingFailed) {
    return <Navigate to="/failed" />;
  }

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-start items-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center gap-5">
        <div className="self-stretch text-center text-white text-3xl font-bold leading-tight">
          Matching you with another user within {time}s...
        </div>
        {
          time < 10 ?         
            <div className="self-stretch text-center text-white text-xl font-bold leading-tight">
              Cannot find an exact match, trying partial matches...
            </div>
          : <></>
        }
        <div className='flex flex-row w-full items-center justify-center gap-14'>
          <img className="w-40 h-40" src={baseAvatarUrl} alt="static avatar" />
          <LoadingDots />
          <AvatarDisplay baseUrl={baseAvatarUrl} />
        </div>

        <Link to="/language">
          <button className="btn btn-secondary">
            Cancel
          </button>
        </Link>
      </main>
    </div>
  );
}

export default MatchingPage;