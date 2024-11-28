import React, { createContext, useContext, useState } from "react";

import { useUsers } from "../hooks/users/useUsers";
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
  const { users, isLoading } = useUsers();
  const { isApproving, approveUser } = useApproveUser();
  const { isRejecting, rejectUser } = useRejectUser();
  const { isDeactivating, deactivateUser } = useDeactivateUser();
  const { isDeleting, deleteUser } = useDeleteUser();

  if (isLoading || isApproving || isRejecting || isDeleting || isDeactivating)
    return <Spinner />;

  const handleSelectUser = (roleId) => {
    setSelectedUsers((prev) =>
      prev.includes(roleId)
        ? prev.filter((userId) => userId !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSelectAllUsers = (users, isSelected) => {
    if (isSelected) {
      setSelectedUsers(users.map((user) => user.roleId));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserAction = async (action) => {
    const userMap = new Map(users.map((user) => [user.roleId, user]));
    await Promise.all(
      selectedUsers.map(async (userId) => {
        const user = userMap.get(userId);
        if (user) {
          switch (action) {
            case "approve":
              return approveUser(user);
            case "reject":
              return rejectUser(user);
            case "delete":
              return deleteUser(user);
            case "deactivate":
              return deactivateUser(user);
            default:
              throw new Error(`Unknown action: ${action}`);
          }
        }
      })
    );
    setSelectedUsers([]);
  };

  return (
    <UserSelectionContext.Provider
      value={{
        selectedUsers,
        setSelectedUsers,
        handleSelectUser,
        handleSelectAllUsers,
        handleUserAction,
      }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};
