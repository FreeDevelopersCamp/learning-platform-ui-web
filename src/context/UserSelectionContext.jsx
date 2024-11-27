import React, { createContext, useContext, useState } from "react";

import { useUser } from "../hooks/users/useUser";
import { useApproveUser } from "../features/users/useApproveUser";
import { useRejectUser } from "../features/users/useRejectUser";
import { useDeleteUser } from "../features/users/useDeleteUser";
import { useDeactivateUser } from "../features/users/useDeactivateUser";

import Spinner from "../ui/Spinner";
const UserSelectionContext = createContext();

export const useUserSelection = () => {
  return useContext(UserSelectionContext);
};

export const UserSelectionProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users, isLoading } = useUser();
  const { isApproving, approveUser } = useApproveUser();
  const { isRejecting, rejectUser } = useRejectUser();
  const { isDeactivating, deactivateUser } = useDeactivateUser();
  const { isDeleting, deleteUser } = useDeleteUser();

  if (isLoading || isApproving || isRejecting || isDeleting || isDeactivating)
    return <Spinner />;

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
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) approveUser(user);
    });
  };

  const handleRejectSelectedUsers = () => {
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) rejectUser(user);
    });
  };

  const handleDeleteSelectedUsers = () => {
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) deleteUser(user);
    });
  };

  const handleDeactivateSelectedUsers = () => {
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) deactivateUser(user);
    });
  };

  return (
    <UserSelectionContext.Provider
      value={{
        selectedUsers,
        handleSelectUser,
        handleSelectAllUsers,
        handleApproveSelectedUsers,
        handleRejectSelectedUsers,
        handleDeleteSelectedUsers,
        handleDeactivateSelectedUsers,
      }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};
