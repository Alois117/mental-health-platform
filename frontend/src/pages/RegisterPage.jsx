import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
        const res = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
        });
        setMessage('Registration successful!');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 1000); 
    } catch (err) {
    setMessage(err.response?.data?.message || 'An error occurred');
        setMessageType('error');
    }
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {message && (
            <p 
            className={`text-white text-center p-2 rounded-lg transition-opacity duration-500 ${
                messageType === 'success' ? 'bg-green-400' : 'bg-red-400'
            }`}
            >
            {message}
            </p>
        )}
        <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
            required
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
            required
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Register</button>
        <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-green-500">Login</Link>
                </p>
    </form>
    </div>
);
};

export default RegistrationPage;
