import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { MessageSquare, Phone, Video } from "lucide-react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  if (!selectedConversation) return null;

  return (
    <div className="sticky top-0 left-0 right-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="my-drawer-2"
            className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110 cursor-pointer"
          >
            <CiMenuFries className="text-2xl" />
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md transform hover:scale-105 transition-transform duration-300">
                <img
                  src={selectedConversation.image.url}
                  alt={selectedConversation.fullname}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                  getOnlineUsersStatus(selectedConversation._id) === 'Online'
                    ? 'bg-green-500'
                    : 'bg-gray-500'
                } shadow-sm`}
              ></span>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-semibold text-white">
                {selectedConversation.fullname}
              </h1>
              <span className={`text-xs font-medium ${
                getOnlineUsersStatus(selectedConversation._id) === 'Online'
                  ? 'text-green-400'
                  : 'text-gray-400'
              }`}>
                {getOnlineUsersStatus(selectedConversation._id)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="hidden sm:block p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
              <MessageSquare size={20} />
            </button>
            <button className="hidden sm:block p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
              <Phone size={20} />
            </button>
            <button className="hidden sm:block p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
              <Video size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;