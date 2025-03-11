import { useState, useEffect } from "react";
import { FaBrain, FaUserMd, FaPills } from "react-icons/fa";
import background1 from "../assets/background1.jpg";
import background2 from "../assets/background2.jpg";
import background3 from "../assets/background3.jpg";

const HomeBody = () => {
  // Array of background images
  const images = [background2, background1, background3];

  // State to track current image index
  const [currentImage, setCurrentImage] = useState(0);

  // Effect to change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
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
          At AmaniCare, we are committed to providing compassionate support,
          professional therapy, and effective mental health solutions to help
          you lead a balanced and fulfilling life.
        </p>

        <div className="mt-6 space-x-4">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md">
            Get Support
          </button>
          <button className="border border-white px-6 py-3 rounded-lg shadow-md">
            Book an Appointment
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-12 flex flex-wrap justify-center gap-6">
        <div className="bg-yellow-500 text-black p-6 rounded-lg flex flex-col items-center w-64">
          <FaUserMd size={40} />
          <h3 className="text-xl font-bold mt-3">Professional Consultation</h3>
          <p className="text-sm mt-2">
            Speak with our certified mental health experts for guidance and support.
          </p>
        </div>

        <div className="bg-[#1E3A5F] text-white p-6 rounded-lg flex flex-col items-center w-64">
          <FaBrain size={40} />
          <h3 className="text-xl font-bold mt-3">Therapy Sessions</h3>
          <p className="text-sm mt-2">
            Personalized therapy plans to help you cope with anxiety, stress, and depression.
          </p>
        </div>

        <div className="bg-[#1E3A5F] text-white p-6 rounded-lg flex flex-col items-center w-64">
          <FaPills size={40} />
          <h3 className="text-xl font-bold mt-3">Medication Support</h3>
          <p className="text-sm mt-2">
            Access safe and effective medication under the guidance of professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
