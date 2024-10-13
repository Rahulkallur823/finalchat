import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`flex items-center space-x-4 px-4 py-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
        isSelected ? "bg-gray-800" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="relative">
        <img
          src={user.image.url} // Use the user's image URL here
          alt={user.fullname}
          className="w-12 h-12 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold truncate">{user.fullname}</h3>
        <p className="text-gray-400 text-sm truncate">{user.email}</p>
      </div>
    </div>
  );
}

export default User;
