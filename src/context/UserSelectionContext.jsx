import React, { createContext, useContext, useState } from "react";

const UserSelectionContext = createContext();

export const useUserSelection = () => {
  return useContext(UserSelectionContext);
};

export const UserSelectionProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleSelectAllUsers = (users, isSelected) => {
    if (isSelected) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleApproveSelectedUsers = () => {
    // Logic to approve selected users
  };

  const handleRejectSelectedUsers = () => {
    // Logic to reject selected users
  };

  const handleDeleteSelectedUsers = () => {};

  return (
    <UserSelectionContext.Provider
      value={{
        selectedUsers,
        handleSelectUser,
        handleSelectAllUsers,
        handleApproveSelectedUsers,
        handleRejectSelectedUsers,
        handleDeleteSelectedUsers,
      }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};
