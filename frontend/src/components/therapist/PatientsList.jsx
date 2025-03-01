import React from "react";

const PatientList = () => {
  const patients = [
    { id: 1, name: "John Doe", status: "Active" },
    { id: 2, name: "Jane Smith", status: "Inactive" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Assigned Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id} className="p-2 border-b">
            {patient.name} - <span className="text-gray-500">{patient.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
