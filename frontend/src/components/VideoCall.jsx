import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from '../components/VideoPlayer';

const APP_ID = 'd097d64fb7fc4b6c9baa6cc8b4e04a6f';
const TOKEN = '007eJxTYFCc8Jl90ja3cwl9ou4l7rNu7uDvX5Dv8uDviYunS8WqvJMUGFKMzAwtjAxMks0MDU0sTUwtLJISjQ0sDYzSLIwtTNPS2sXPpDcEMjK8rFvKysgAgSA+O0NxanFxZn4eAwMAqNwgyA==';
const CHANNEL = 'session';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const VideoCall = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [joined, setJoined] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    const handleUserJoined = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'video') {
        setUsers((prevUsers) => [...prevUsers, user]);
      }
      if (mediaType === 'audio') {
        user.audioTrack.play();
      }
    };

    const handleUserLeft = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
    };

    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, []);

  const startCall = async () => {
    if (isStarting || joined || client.connectionState === 'CONNECTED' || client.connectionState === 'CONNECTING') {
      console.log("Call is already starting or joined.");
      return;
    }

    setIsStarting(true);

    try {
      console.log("Joining Call...");
      await client.join(APP_ID, CHANNEL, TOKEN, null);

      console.log("Joined Call Successfully!");
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      console.log("Tracks Created:", tracks);
      const [audioTrack, videoTrack] = tracks;
      setLocalTracks(tracks);

      setUsers((prevUsers) => [
        ...prevUsers,
        { uid: client.uid, videoTrack, audioTrack }
      ]);

      await client.publish(tracks);
      console.log("Published Tracks Successfully!");
      setJoined(true);
    } catch (error) {
      console.error("Error in startCall:", error);
    } finally {
      setIsStarting(false);
    }
  };

  const endCall = async () => {
    if (joined) {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });
      setUsers([]);
      setJoined(false);
      await client.leave();
    }
  };

  const leaveCall = async () => {
    if (joined) {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== client.uid));
      setJoined(false);
      await client.leave();
    }
  };

  const toggleAudio = () => {
    if (localTracks[0]) {
      localTracks[0].setEnabled(!isAudioMuted);
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (localTracks[1]) {
      localTracks[1].setEnabled(!isVideoMuted);
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!joined && userRole === 'user' && (
        <button
          onClick={startCall}
          disabled={isStarting || joined}
          className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {isStarting ? "Starting..." : "Start Meeting"}
        </button>
      )}
      {!joined && userRole === 'therapist' && (
        <button
          onClick={startCall}
          disabled={isStarting || joined}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {isStarting ? "Starting..." : "Accept Call"}
        </button>
      )}

      {joined && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} isLocal={user.uid === client.uid} />
          ))}
        </div>
      )}

      {joined && (
        <div className="mt-4 flex space-x-4">
          <button onClick={toggleAudio} className="px-4 py-2 bg-gray-800 text-white rounded-lg">
            {isAudioMuted ? "Unmute" : "Mute"}
          </button>
          <button onClick={toggleVideo} className="px-4 py-2 bg-gray-800 text-white rounded-lg">
            {isVideoMuted ? "Show Video" : "Hide Video"}
          </button>
          {userRole === 'user' && (
            <button onClick={endCall} className="px-4 py-2 bg-red-600 text-white rounded-lg">
              End Meeting
            </button>
          )}
          {userRole === 'therapist' && (
            <button onClick={leaveCall} className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Leave Meeting
            </button>
          )}
        </div>
      )}
    </div>
  );
};

VideoCall.defaultProps = {
  userRole: "user",
};

export default VideoCall;