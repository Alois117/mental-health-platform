import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AppointmentList = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        let url = 'http://localhost:3000/api/appointments';

        // Filter appointments based on user role
        if (user.role === 'therapist') {
          url += `?therapistId=${user.id}`;
        } else if (user.role === 'user') {
          url += `?userId=${user.id}`;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name || 'User'}!
        <span className="block text-lg text-gray-600 mt-1">
          {user?.role ? `${user.role} Dashboard` : 'Loading...'}
        </span>
      </h1>

      {/* Role-Specific Dashboard */}
      {user?.role === 'admin' && (
        <div className="bg-green-50 p-4 rounded">
          <h2 className="text-xl font-bold text-green-800">Admin Features</h2>
          <ul className="mt-2 space-y-2">
            <li>• Manage all appointments</li>
            <li>• Assign therapists</li>
            <li>• View system analytics</li>
          </ul>
        </div>
      )}

      {user?.role === 'therapist' && (
        <div className="bg-blue-50 p-4 rounded">
          <h2 className="text-xl font-bold text-blue-800">Therapist Features</h2>
          <ul className="mt-2 space-y-2">
            <li>• View your appointments</li>
            <li>• Update appointment notes</li>
            <li>• Manage your schedule</li>
          </ul>
        </div>
      )}

      {user?.role === 'user' && (
        <div className="bg-purple-50 p-4 rounded">
          <h2 className="text-xl font-bold text-purple-800">Patient Features</h2>
          <ul className="mt-2 space-y-2">
            <li>• Book new appointments</li>
            <li>• View appointment history</li>
            <li>• Message your therapist</li>
          </ul>
        </div>
      )}

      {/* Display filtered appointments */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="p-3 bg-white shadow rounded-lg">
                {appointment.date} - {appointment.therapistName || 'No therapist assigned'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
