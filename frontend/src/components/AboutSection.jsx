import React from "react";
import aboutImage1 from "../assets/about1.jpg"; // Main image

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-lg text-teal-600 italic">About Us</h3>
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Your Mental Wellness Matters
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            At our platform, we provide compassionate support for individuals
            seeking mental well-being. Whether you're dealing with stress,
            anxiety, or personal growth, we offer guidance to help you navigate
            your journey.
          </p>
          <blockquote className="mt-6 italic text-teal-700 bg-white shadow-md p-4 rounded-lg border-l-4 border-teal-500">
            "Healing is not about moving on, but moving forward."
          </blockquote>
          <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition">
            Learn More
          </button>
        </div>

        {/* Right Content (Image & Video) */}
        <div className="md:w-1/2 relative">
          <div className="relative">
            <img
              src={aboutImage1}
              alt="Therapy Session"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-[-40px] left-8 w-52 h-32 bg-white shadow-lg rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Mental Health Support Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
