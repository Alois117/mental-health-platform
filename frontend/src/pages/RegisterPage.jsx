import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import image2 from "../assets/image2.jpg";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage("Registration successful!");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image2})` }}></div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6">
        {/* Toast Message */}
        {message && (
          <div className={`fixed top-4 right-4 p-3 rounded-lg text-white shadow-md transition-opacity duration-500 ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" required />
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Register</button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <button className="w-full flex items-center justify-center bg-white border p-3 rounded-lg shadow hover:bg-gray-100 mb-2">
            <FcGoogle className="mr-2 text-xl" /> Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700">
            <FaFacebook className="mr-2 text-xl" /> Sign up with Facebook
          </button>

          <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-green-500">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;