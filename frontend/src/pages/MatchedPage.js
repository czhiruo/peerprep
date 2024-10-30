import React from 'react';
import { Link } from 'react-router-dom';

const baseAvatarUrl = "https://avatar.iran.liara.run/public";

const generateRandomId = () => Math.floor(Math.random() * 1000);

function MatchedPage({ matchResult }) {

  const { userId, matchedUserId, topic, difficulty, language } = matchResult;
  const avatarMatchUrl = `${baseAvatarUrl}?id=${generateRandomId()}`;

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-start items-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row self-stretch text-center text-white text-2xl font-bold leading-tight gap-5">
          <p> Category: {topic} </p>
          <p> Difficulty: {difficulty} </p>
          <p> Language: {language} </p>
        </div>

        <div className='flex flex-row w-full items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <img className="w-40 h-40" src={baseAvatarUrl} alt="static avatar" />
            <div className='text-white text-xl'>
              {userId}
            </div>
          </div>
          <div className="w-36 border-black"></div>
          <div className='flex flex-col items-center justify-center gap-3'>
            <img className="w-40 h-40" src={avatarMatchUrl} alt="avatar match" />
            <div className='text-white text-xl'>
              {matchedUserId}
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="flex flex-row w-full justify-between">
          <Link to='/matching'>
            <button className="btn btn-secondary">
              Rematch
            </button>
          </Link>
          <Link to='/room'>
            <button className="btn btn-primary">
              Start now!
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default MatchedPage;
