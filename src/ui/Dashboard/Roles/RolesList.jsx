import React from "react";

function RolesList() {
  const roles = [
    {
      title: "Administrator",
      totalUsers: 4,
      users: [
        { avatar: "https://example.com/avatar1.png" },
        { avatar: "https://example.com/avatar2.png" },
        { avatar: "https://example.com/avatar3.png" },
        { avatar: "https://example.com/avatar4.png" },
      ],
      editRole: "Edit Role",
    },
    {
      title: "Editor",
      totalUsers: 7,
      users: [
        { avatar: "https://example.com/avatar5.png" },
        { avatar: "https://example.com/avatar6.png" },
        { avatar: "https://example.com/avatar7.png" },
        { avatar: "https://example.com/avatar8.png" },
        { avatar: "https://example.com/avatar9.png" },
        { avatar: "https://example.com/avatar10.png" },
        { avatar: "https://example.com/avatar11.png" },
      ],
      editRole: "Edit Role",
    },
    {
      title: "Users",
      totalUsers: 5,
      users: [
        { avatar: "https://example.com/avatar12.png" },
        { avatar: "https://example.com/avatar13.png" },
        { avatar: "https://example.com/avatar14.png" },
      ],
      editRole: "Edit Role",
    },
    {
      title: "Support",
      totalUsers: 6,
      users: [
        { avatar: "https://example.com/avatar15.png" },
        { avatar: "https://example.com/avatar16.png" },
        { avatar: "https://example.com/avatar17.png" },
      ],
      editRole: "Edit Role",
    },
    {
      title: "Restricted User",
      totalUsers: 10,
      users: [
        { avatar: "https://example.com/avatar18.png" },
        { avatar: "https://example.com/avatar19.png" },
        { avatar: "https://example.com/avatar20.png" },
        { avatar: "https://example.com/avatar21.png" },
        { avatar: "https://example.com/avatar22.png" },
        { avatar: "https://example.com/avatar23.png" },
        { avatar: "https://example.com/avatar24.png" },
        { avatar: "https://example.com/avatar25.png" },
        { avatar: "https://example.com/avatar26.png" },
        { avatar: "https://example.com/avatar27.png" },
      ],
      editRole: "Edit Role",
    },
  ];

  return (
    <div className="p-4">
      {roles.map((role, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold">{role.title}</h2>
          <p className="text-gray-600">Total Users: {role.totalUsers}</p>
          <div className="flex space-x-2 mt-2">
            {role.users.map((user, userIndex) => (
              <img
                key={userIndex}
                src={user.avatar}
                alt={`Avatar ${userIndex + 1}`}
                className="w-8 h-8 rounded-full"
              />
            ))}
          </div>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            {role.editRole}
          </button>
        </div>
      ))}
      <div className="bg-gray-100 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">Add Role</h2>
        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
          Add Role
        </button>
      </div>
    </div>
  );
}

export default RolesList;
