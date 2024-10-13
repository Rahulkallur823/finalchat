import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center">
          <div className="relative flex-grow mb-3 sm:mb-0 sm:mr-2 group w-full">
            <input
              type="text"
              className="w-full bg-gray-800 text-white rounded-full py-3 px-6 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 placeholder-gray-400 group-hover:bg-green-100 group-hover:text-gray-900 group-hover:placeholder-gray-600"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            <FaSearch className="text-xl mx-auto" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;