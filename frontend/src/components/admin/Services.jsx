import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [subscribedPatients, setSubscribedPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [newService, setNewService] = useState({
      name: "",
      description: "",
      type: "online",
      sessionDuration: 60,
      pricing: { basic: 0, premium: 0, enterprise: 0 },
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
      const fetchData = async () => {
          try {
              const [servicesRes, patientsRes, therapistsRes] = await Promise.all([
                  axios.get("http://localhost:3000/api/services"),
                  axios.get("http://localhost:3000/api/patients/subscribed"),
                  axios.get("http://localhost:3000/api/therapists"),
              ]);
              setServices(servicesRes.data);
              setSubscribedPatients(patientsRes.data);
              setTherapists(therapistsRes.data);
          } catch (error) {
              console.error("Error fetching data:", error.response?.data || error.message);
              setMessage("Failed to fetch data.");
          }
      };
      fetchData();
  }, []);

  const handleAddService = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:3000/api/services", newService);
          setMessage("Service added successfully!");
          setNewService({
              name: "",
              description: "",
              type: "online",
              sessionDuration: 60,
              pricing: { basic: 0, premium: 0, enterprise: 0 },
          });
          setServices([...services, response.data]);
      } catch (error) {
          console.error("Error adding service:", error.response?.data || error.message);
          setMessage("Failed to add service.");
      }
  };

  const handleAssignTherapist = async (patientId, therapistId) => {
      try {
          await axios.post(`http://localhost:3000/api/patients/${patientId}/assign-therapist`, { therapistId });
          setMessage("Therapist assigned successfully!");
          const res = await axios.get("http://localhost:3000/api/patients/subscribed");
          setSubscribedPatients(res.data);
      } catch (error) {
          console.error("Error assigning therapist:", error.response?.data || error.message);
          setMessage("Failed to assign therapist.");
      }
  };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Services Management</h1>
            <p>Manage all services and assign therapists here.</p>

            {message && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm">
                    {message}
                </div>
            )}

            {/* Add New Service Form */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
                <form onSubmit={handleAddService} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Service Name</label>
                        <input
                            type="text"
                            value={newService.name}
                            onChange={(e) =>
                                setNewService({ ...newService, name: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={newService.description}
                            onChange={(e) =>
                                setNewService({ ...newService, description: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Session Duration (minutes)</label>
                        <input
                            type="number"
                            value={newService.sessionDuration}
                            onChange={(e) =>
                                setNewService({ ...newService, sessionDuration: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pricing</label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">Basic</label>
                                <input
                                    type="number"
                                    value={newService.pricing.basic}
                                    onChange={(e) =>
                                        setNewService({
                                            ...newService,
                                            pricing: { ...newService.pricing, basic: e.target.value },
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Premium</label>
                                <input
                                    type="number"
                                    value={newService.pricing.premium}
                                    onChange={(e) =>
                                        setNewService({
                                            ...newService,
                                            pricing: { ...newService.pricing, premium: e.target.value },
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Enterprise</label>
                                <input
                                    type="number"
                                    value={newService.pricing.enterprise}
                                    onChange={(e) =>
                                        setNewService({
                                            ...newService,
                                            pricing: { ...newService.pricing, enterprise: e.target.value },
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Service
                    </button>
                </form>
            </section>

            {/* Display Services */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Available Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <div className="mt-2">
                                <p className="text-sm">
                                    <strong>Session Duration:</strong> {service.sessionDuration} minutes
                                </p>
                                <p className="text-sm">
                                    <strong>Basic:</strong> ${service.pricing.basic}
                                </p>
                                <p className="text-sm">
                                    <strong>Premium:</strong> ${service.pricing.premium}
                                </p>
                                <p className="text-sm">
                                    <strong>Enterprise:</strong> ${service.pricing.enterprise}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subscribed Patients and Therapist Assignment */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Subscribed Patients</h2>
                <div className="space-y-4">
                    {subscribedPatients.map((patient) => (
                        <div key={patient._id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            <p className="text-sm text-gray-600">{patient.email}</p>
                            <p className="text-sm">
                                <strong>Subscription:</strong> {patient.subscriptionType}
                            </p>
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Assign Therapist
                                </label>
                                <select
                                    onChange={(e) =>
                                        handleAssignTherapist(patient._id, e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">Select Therapist</option>
                                    {therapists.map((therapist) => (
                                        <option key={therapist._id} value={therapist._id}>
                                            {therapist.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminServices;