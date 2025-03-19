import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section id="contact" className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="flex items-center text-lg text-gray-700 mb-4">
              <FaMapMarkerAlt className="text-yellow-500 mr-2 text-xl" />
              <span>Westside Towers, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center text-lg text-gray-700 mb-4">
              <FaEnvelope className="text-yellow-500 mr-2 text-xl" />
              <span>hello@amanicare.com</span>
            </div>
            <div className="flex items-center text-lg text-gray-700 mb-4">
              <FaPhone className="text-yellow-500 mr-2 text-xl" />
              <span>+254-711-840-122</span>
            </div>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8615758325764!2d36.79475827411523!3d-1.2547804355907146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f177177da7fcb%3A0xbc410a94920d2f36!2sWestside%20Towers!5e0!3m2!1sen!2ske!4v1742318279222!5m2!1sen!2ske"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-primary"
              />
              <textarea
                placeholder="Type Here...."
                className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:border-primary mb-6"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-3 rounded-md text-lg font-semibold hover:bg-opacity-80 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;