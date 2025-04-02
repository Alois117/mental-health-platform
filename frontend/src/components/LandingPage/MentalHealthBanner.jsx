import React from "react";
import backgroundImage from "../assets/Banner.jpg";

const MentalHealthBanner = () => {
  return (
    <div
      className="relative w-full h-48 bg-cover bg-center flex items-center justify-center text-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-white max-w-2xl">
        <h2 className="text-xl md:text-2xl font-semibold">
          You Need to Understand That Mental Well-being Matters
        </h2>
        <p className="text-sm md:text-base mt-2">
          Seeking support is a sign of strength. Connect with professionals and
          find the help you need.
        </p>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded">
          Consultation Now
        </button>
      </div>
    </div>
  );
};

export default MentalHealthBanner;