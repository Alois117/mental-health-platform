import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A5F] text-white py-12">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-6">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-500">AmaniCare</h3>
          <p className="mt-3 text-gray-300">
            We are committed to providing compassionate mental health support and expert therapy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="text-gray-300 space-y-2">
            <li><a href="#" className="hover:text-yellow-500">Home</a></li>
            <li><a href="#" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-500">Services</a></li>
            <li><a href="#" className="hover:text-yellow-500">Blog</a></li>
            <li><a href="#" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="text-gray-300 space-y-2">
            <li>Individual Therapy</li>
            <li>Couples Counseling</li>
            <li>Family Therapy</li>
            <li>Group Therapy</li>
            <li>Career Counseling</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="text-gray-300 space-y-3">
            <p><FaPhone className="inline mr-2 text-yellow-500" /> +254-711-840-122</p>
            <p><FaEnvelope className="inline mr-2 text-yellow-500" /> hello@amanicare.com</p>
            <p><FaMapMarkerAlt className="inline mr-2 text-yellow-500" /> Nairobi, Kenya</p>
            <p><FaClock className="inline mr-2 text-yellow-500" /> Mon-Sat: 9AM - 9PM</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        © {new Date().getFullYear()} AmaniCare. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
