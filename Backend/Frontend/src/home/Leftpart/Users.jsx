import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);

  return (
    <div className="flex flex-col h-full">
      <h1 className="px-4 py-3 text-lg font-semibold text-white bg-gray-800 border-b border-gray-700">
        Messages
      </h1>
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {allUsers.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No users found</p>
          ) : (
            allUsers.map((user, index) => (
              <User key={user.id || index} user={user} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Users;