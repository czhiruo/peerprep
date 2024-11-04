import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketService from '../services/socketService';

const baseAvatarUrl = "https://avatar.iran.liara.run/public";

const generateRandomId = () => Math.floor(Math.random() * 1000);

function MatchedPage({ matchResult }) {

  const { userId, matchedUserId, topic, difficulty, language } = matchResult;
  
  const [userAcceptance, setUserAcceptance] = useState(null);
  const [matchedUserAcceptance, setMatchedUserAcceptance] = useState(null);
  const [showRejection, setShowRejection] = useState(false);
  
  const navigate = useNavigate();
  const avatarMatchUrl = `${baseAvatarUrl}?id=${generateRandomId()}`;

  useEffect(() => {
    // Listen for acceptance status from the matched user
    socketService.onAcceptanceUpdate((statusUpdate) => {
      console.log("Acceptance status update received:", statusUpdate);
      console.log("statusUpdate.userId: ", statusUpdate.userId);
      console.log("statusUpdate.isAccepted: ", statusUpdate.isAccepted);
      
      console.log("matchedUserId: ", matchedUserId);
      if (statusUpdate.userId === matchedUserId) {
        setMatchedUserAcceptance(statusUpdate.isAccepted);
        console.log("statusUpdate.userId == matchedUser");
      }
  });

  }, [matchedUserId]);

  useEffect(() => {
    console.log("matchedUserAcceptance: ", matchedUserAcceptance);
    console.log("userAcceptance: ", userAcceptance);
    // When both users have accepted the match, send the collab room data
    if (matchedUserAcceptance && userAcceptance) {
      console.log("Both users have accepted the match");
      sendCollabRoomData();
    }
  
    if (matchedUserAcceptance === false) {
      console.log("Matched user rejected the match");
      setShowRejection(true);
  
      setTimeout(() => {
        setShowRejection(false);
        navigate('/matching');
      }, 3000);
    }
  }, [matchedUserAcceptance, userAcceptance, navigate]);

  // useEffect(() => {
  //   socketService.onCollabRoom((data) => {
  //     console.log("Received 'open-collab-room' event:", data);
  //     // Navigate to the collaboration room or update the UI as needed
  //     navigate('/room');
  //   });
  // }, [navigate]);

  const handleAccept = () => {
    console.log("Accepting match");
    setUserAcceptance(true);
    socketService.sendAcceptanceStatus({ userId, isAccepted: true, matchedUserId });

    if (matchedUserAcceptance) {
      sendCollabRoomData();
    }
  };

  const sendCollabRoomData = () => {
    const collabRoomData = {
      userId1: userId,
      userId2: matchedUserId,
      interestTopic: topic,
      difficulty: difficulty,
      language: language,
    }
    socketService.sendToCollabRoom(collabRoomData);
    navigate('/room');
  };

  const handleRematch = () => {
    setUserAcceptance(false);
    socketService.sendAcceptanceStatus({ userId, isAccepted: false, matchedUserId });
    // socketService.sendRematchNotification({ userId, matchedUserId });
    // socketService.notifyMatchedUserRematch({ userId, matchedUserId });
    navigate('/matching');
  };

  
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
            <div className={`w-4 h-4 rounded-full ${ userAcceptance === null ? 'bg-gray-500' : userAcceptance ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <div className="w-36 border-black"></div>
          <div className='flex flex-col items-center justify-center gap-3'>
            <img className="w-40 h-40" src={avatarMatchUrl} alt="avatar match" />
            <div className='text-white text-xl'>
              {matchedUserId}
            </div>
            <div className={`w-4 h-4 rounded-full ${ matchedUserAcceptance === null ? 'bg-gray-500' : matchedUserAcceptance ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>

        {showRejection && (
          <div>
            Your matched user rejected the match. You will be rematched in 3 seconds.
          </div>
        )}

        <div className="flex flex-row w-full justify-between mt-4">
          <button className="btn btn-secondary" onClick={handleRematch}>
            Rematch
          </button>
      
          <button className="btn btn-primary" onClick={handleAccept}>
            Start now!
          </button>
        </div>
      </main>
    </div>
  );
}

export default MatchedPage;
