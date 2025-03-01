import { useState } from "react";

const MoodTracker = () => {
  const [mood, setMood] = useState(5);

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h3 className="text-lg font-bold mb-3">Mood Tracker</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full"
      />
      <p className="text-center mt-2">Current Mood: {mood}/10</p>
    </div>
  );
};

export default MoodTracker;
