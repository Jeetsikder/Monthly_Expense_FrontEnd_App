import React from "react";

export default function UserInfo() {
  const user = {
    name: "Jeet Sikder",
    email: "Demo@gmail.com",
  };
  return (
    <div className=" h-fit bg-gray-100">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-6">User Information</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <div className="text-gray-900 text-lg">{user.name}</div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="text-gray-900">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
