const appointments = [
    { date: "Feb 20", time: "10:00 AM", therapist: "Dr. Smith" },
    { date: "Feb 22", time: "2:00 PM", therapist: "Dr. John" },
  ];
  
  const AppointmentList = () => {
    return (
      <div className="bg-white shadow-md p-4 rounded-md">
        <h3 className="text-lg font-bold mb-3">Upcoming Appointments</h3>
        <ul>
          {appointments.map((appt, index) => (
            <li key={index} className="border-b p-2">
              {appt.date} - {appt.time} with {appt.therapist}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default AppointmentList;
  