import React from 'react';
import '.././index.css';

const LoadingDots = () => {
    return (
      <div className="flex space-x-2">
        <div className="bouncing-dot"></div>
        <div className="bouncing-dot"></div>
        <div className="bouncing-dot"></div>
      </div>
      
    );
}

export default LoadingDots;
  