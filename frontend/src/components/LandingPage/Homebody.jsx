import { useState, useEffect } from "react";
import { FaBrain, FaUserMd, FaPills, FaTimes } from "react-icons/fa";
import background1 from "../assets/background1.jpg";
import background2 from "../assets/background2.jpg";
import background3 from "../assets/background3.jpg";

const HomeBody = () => {
  const images = [background2, background1, background3];
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero"
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white text-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 px-6">
        <h2 className="italic text-lg">Welcome to AmaniCare</h2>
        <h1 className="text-5xl font-bold">
          Your <span className="text-yellow-400">Mental Wellness</span> Matters
        </h1>
        <p className="text-lg mt-4">
          At AmaniCare, we provide compassionate support, professional therapy, and mental health solutions.
        </p>

        <div className="mt-6 space-x-4">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md">
            Get Support
          </button>
          <button
            className="border border-white px-6 py-3 rounded-lg shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            Book an Appointment
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-12 flex flex-wrap justify-center gap-6">
        <div className=" bg-[#1E3A5F] text-white p-6 rounded-lg flex flex-col items-center w-64">
          <FaUserMd size={40} />
          <h3 className="text-xl font-bold mt-3">Professional Consultation</h3>
          <p className="text-sm mt-2">Speak with our certified mental health experts.</p>
        </div>
        <div className="bg-yellow-500 text-black p-6 rounded-lg flex flex-col items-center w-64">
          <FaBrain size={40} />
          <h3 className="text-xl font-bold mt-3">Therapy Sessions</h3>
          <p className="text-sm mt-2">Personalized therapy for anxiety, stress, and depression.</p>
        </div>
        <div className="bg-[#1E3A5F] text-white p-6 rounded-lg flex flex-col items-center w-64">
          <FaPills size={40} />
          <h3 className="text-xl font-bold mt-3">Medication Support</h3>
          <p className="text-sm mt-2">Access safe and effective medication guidance.</p>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white text-black rounded-lg p-6 md:p-8 w-[90vw] max-w-md max-h-[90vh] overflow-y-auto shadow-lg relative">
      <h2 className="text-2xl font-bold">Make An Appointment</h2>
      <p className="text-sm mt-2">Fill in your details to schedule an appointment.</p>
      
      <input type="text" placeholder="Full Name" className="w-full border p-2 mt-4 rounded" />
      <input type="email" placeholder="Email Address" className="w-full border p-2 mt-2 rounded" />
      <input type="text" placeholder="Phone Number" className="w-full border p-2 mt-2 rounded" />
      <select className="w-full border p-2 mt-2 rounded">
        <option>Select Service</option>
        <option>Therapy</option>
        <option>Consultation</option>
        <option>Medication Support</option>
      </select>
      <input type="date" className="w-full border p-2 mt-2 rounded" />
      
      <button className="bg-yellow-500 text-white w-full mt-4 p-2 rounded">
        Book an Appointment
      </button>
      
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            onClick={() => setIsModalOpen(false)}
          >
            <FaTimes size={20} />
          </button>
    </div>
  </div>
)}
    </div>
  );
};

export default HomeBody;
