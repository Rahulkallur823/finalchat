import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-gray-300">
      <div className="flex-shrink-0">
        <Search />
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <Users />
        </div>
      </div>
      <div className="flex-shrink-0 border-t border-gray-700">
        <Logout />
      </div>
    </div>
  );
}

export default Left;