import React, { useEffect, useRef, useState } from 'react';

export const VideoPlayer = ({ user, isLocal }) => {
  const ref = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (user.videoTrack) {
      user.videoTrack.play(ref.current);
    }
  }, [user.videoTrack]);

  const toggleFullscreen = () => {
    if (ref.current) {
      if (!isFullscreen) {
        ref.current.requestFullscreen().then(() => setIsFullscreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 cursor-pointer" onClick={toggleMinimize}>
        <p className="text-sm text-gray-700">Minimized: Uid {user.uid}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 w-screen h-screen z-50' : 'w-full h-64'}`}>
      <div ref={ref} className={`w-full ${isFullscreen ? 'h-screen' : 'h-64'} bg-black`}></div>
      <div className="mt-2 flex space-x-2">
        <button onClick={toggleFullscreen} className="px-2 py-1 bg-gray-800 text-white rounded-lg text-xs">
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
        <button onClick={toggleMinimize} className="px-2 py-1 bg-gray-800 text-white rounded-lg text-xs">
          Minimize
        </button>
      </div>
    </div>
  );
};