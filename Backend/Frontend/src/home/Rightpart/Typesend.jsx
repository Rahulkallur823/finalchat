import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessages(message);
      setMessage("");
    }
  };

  return (
    <div className="sticky bottom-0 right-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg py-3 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg shadow-inner">
          <button 
            type="button" 
            className="text-gray-400 hover:text-teal-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full p-2"
          >
            <MdAttachFile className="text-2xl" />
          </button>
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-full py-3 px-4 pr-12 outline-none placeholder-gray-500 focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full p-2"
            >
              <FaMicrophone className="text-xl" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className={`p-3 rounded-full ${
              message.trim() && !loading
                ? "bg-teal-500 hover:bg-teal-600"
                : "bg-gray-600"
            } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
          >
            <IoSend className="text-white text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Typesend;