import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your backend server URL

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [activeChat, setActiveChat] = useState("Abigail Blake");

    useEffect(() => {
        // Fetch chat history from backend
        axios.get("http://localhost:5000/api/messages")
            .then(response => setMessages(response.data))
            .catch(error => console.error("Error fetching messages:", error));

        // Listen for incoming messages
        socket.on("message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = async () => {
        if (input.trim()) {
            const message = {
                user: "You", // Replace with logged-in user
                text: input,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };
            
            try {
                await axios.post("http://localhost:5000/api/messages", message);
                socket.emit("message", message);
                setMessages((prev) => [...prev, message]);
                setInput("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 p-6">
            {/* Sidebar */}
            <div className="w-1/4 bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold mb-4">Conversations</h2>
                <p className="text-gray-500">No conversations</p>
            </div>
            
            {/* Chat Window */}
            <div className="flex-1 ml-6 bg-white rounded-lg shadow-lg flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">{activeChat}</h2>
                    <p className="text-sm text-green-500">Online</p>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-500">No conversations</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`mb-4 ${msg.user === "You" ? "text-right" : ""}`}>
                                <p className="text-sm text-gray-500">{msg.time}</p>
                                <div className={`p-3 rounded-lg max-w-[70%] ${msg.user === "You" ? "bg-blue-500 text-white ml-auto" : "bg-gray-100"}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                        placeholder="Type something..."
                    />
                    <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
