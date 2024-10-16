import React from 'react';
import AvatarDisplay from '../components/AvatarDisplay';
import LoadingDots from '../components/LoadingDots';

const baseAvatarUrl = "https://avatar.iran.liara.run/public";

const generateRandomId = () => Math.floor(Math.random() * 1000);

function MatchedPage() {

  const avatarMatchUrl = `${baseAvatarUrl}?id=${generateRandomId()}`;
    
  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-start items-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center gap-5">
        {/* <div className="self-stretch text-center text-white text-3xl font-bold leading-tight">
          We have found a match for you!
        </div> */}
        <div className="flex flex-row self-stretch text-center text-white text-3xl font-bold leading-tight gap-5">
          <p> Category: Strings </p>
          <p> Difficulty: Easy </p>
          <p> Language: Python </p>
        </div>
              
        <div className='flex flex-row w-full items-center justify-center'>
          <img className="w-40 h-40" src={baseAvatarUrl} alt="avatar" />
          <div className="w-36 border-black"></div>
          <img className="w-40 h-40" src={avatarMatchUrl} alt="avatar match" />
        </div>      
        
        {/* Cancel Button */}
        <div className="flex flex-row w-full justify-between">
          <button className="btn btn-secondary">
            Rematch
            </button>
          <button className="btn btn-primary">
            Start now!
          </button>
        </div>
      </main>
    </div>
  );
}

export default MatchedPage;
