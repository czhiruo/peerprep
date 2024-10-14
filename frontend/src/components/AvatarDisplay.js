// AvatarDisplay.js
import React, { useState, useEffect } from 'react';

const AvatarDisplay = ({ baseUrl }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const updateAvatar = () => {
      const newAvatarUrl = `${baseUrl}?t=${Date.now()}`; // Add timestamp as query param
      setAvatarUrl(newAvatarUrl);
    };

    updateAvatar(); // Set initial avatar

    const intervalId = setInterval(updateAvatar, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [baseUrl]);

  return (
    <img className="w-40 h-40" src={avatarUrl} alt="avatar" />
  );
};

export default AvatarDisplay;
