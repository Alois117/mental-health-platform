import React from "react";

const TherapySessions = () => {
  const sessions = [
    { id: 1, patient: "John Doe", date: "2025-02-21", time: "10:00 AM" },
    { id: 2, patient: "Jane Smith", date: "2025-02-22", time: "2:00 PM" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Booked Therapy Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id} className="p-2 border-b">
            {session.patient} - {session.date} at {session.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapySessions;
