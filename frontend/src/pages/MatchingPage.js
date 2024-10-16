import React from 'react';
import AvatarDisplay from '../components/AvatarDisplay';
import LoadingDots from '../components/LoadingDots';

function MatchingPage() {

  const baseAvatarUrl = "https://avatar.iran.liara.run/public";

  return (
    <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-start items-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center gap-5">
        <div className="self-stretch text-center text-white text-3xl font-bold leading-tight">
          Matching you with another user within 30s...
        </div>
        <div className='flex flex-row w-full items-center justify-center gap-14'>
          <img className="w-40 h-40" src={baseAvatarUrl} alt="static avatar" />
          <LoadingDots />
          <AvatarDisplay baseUrl={baseAvatarUrl} />
        </div>

        {/* Cancel Button */}
        <div>
          <button className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}

export default MatchingPage;

// import React from 'react';

// const baseAvatarUrl = "https://avatar.iran.liara.run/public";

// function MatchingFailedPage() {

//   return (
//     <div className="h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-start items-center">
//       {/* Main Content */}
//       <main className="flex-grow flex flex-col items-center justify-center gap-4">
//         <div className="self-stretch text-center text-white text-3xl font-bold leading-tight">
//           Oh no! Seems like everyone is busy right now. Would you like to try again?
//         </div>

//         <div className="flex items-center">
//           <span className="badge badge-error">✖</span> {/* Red Cross using Badge */}
//         </div>

//         {/* Cancel Button */}
//         <div className="flex flex-row w-full justify-between">
//           <button className="btn btn-secondary">
//             Back to Login
//           </button>
//           <button className="btn btn-primary">
//             Try again
//           </button>
//         </div>
//       </main>
//     </div>
//   );

// }

// export default MatchingFailedPage;
