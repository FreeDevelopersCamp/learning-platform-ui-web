import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiEye, HiTrash } from "react-icons/hi2";
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";

import { useApproveUser } from "./useApproveUser";
import { useRejectUser } from "./useRejectUser";
import { useDeleteUser } from "./useDeleteUser";
import { useDeactivateUser } from "./useDeactivateUser";
import { useUserSelection } from "../../context/UserSelectionContext";

import ConfirmApprove from "../../ui/ConfirmApprove";
import ConfirmReject from "../../ui/ConfirmReject";
import ConfirmDeactivate from "../../ui/ConfirmDeactivate";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

const Email = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
`;

const statusToTagName = {
  1: "blue",
  2: "green",
  3: "silver",
};

const statusToTagText = {
  1: "Pending",
  2: "Activated",
  3: "Deactivated",
};

const getRoleCode = (role) => {
  switch (role) {
    case "0":
      return "Admin";
    case "1":
      return "Owner";
    case "2":
      return "Manager";
    case "3":
      return "Account Manager";
    case "4":
      return "Content Manager";
    case "5":
      return "Instructor";
    case "6":
      return "Learner";
    default:
      return "Unknown";
  }
};

function UserRow({ user, children }) {
  let {
    _id: userId,
    userName,
    image,
    role,
    personalInformation,
    contacts,
    status,
  } = user;

  const navigate = useNavigate();
  const { isApproving, approveUser } = useApproveUser();
  const { isRejecting, rejectUser } = useRejectUser();
  const { isDeleting, deleteUser } = useDeleteUser();
  const { isDeactivating, deactivateUser } = useDeactivateUser();

  const {
    selectedUsers,
    handleApproveSelectedUsers,
    handleRejectSelectedUsers,
    handleDeleteSelectedUsers,
    handleDeactivateSelectedUsers,
  } = useUserSelection();

  if (!image) image = "../../../public/default-user.png";

  let roleCode = getRoleCode(role);

  function handleApproveUser(user) {
    console.log("Approving>>>: ", user);
    const currentUser = { ...user, role: role }; // Attach current role explicitly
    if (!selectedUsers?.length) approveUser(currentUser);
    else handleApproveSelectedUsers();
  }

  function handleRejectUser() {
    if (!selectedUsers?.length) rejectUser(user);
    else handleRejectSelectedUsers();
  }

  function handleDeleteUser() {
    if (!selectedUsers?.length) deleteUser(user);
    else handleDeleteSelectedUsers();
  }

  function handleDeactivateUser(user) {
    if (!selectedUsers?.length) deactivateUser(user);
    else handleDeactivateSelectedUsers();
  }

  return (
    <Table.Row>
      {children}

      <div className="flex gap-4">
        <img className="w-14 h-14 mt-2" src={image} alt={userName} />
        <Stacked>
          <User>{`${personalInformation.name.first} ${personalInformation.name.last}`}</User>
          <span>{userName}</span>
        </Stacked>
      </div>

      <Email>{contacts.email}</Email>

      <Tag type={statusToTagName[status]}>{statusToTagText[status]}</Tag>

      <User className="flex items-center gap-4">{roleCode}</User>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={userId} />
          <Menus.List id={userId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/users/${userId}`)}
            >
              See details
            </Menus.Button>

            {(statusToTagText[status] === "Pending" ||
              statusToTagText[status] === "Deactivated") && (
              <Modal.Open opens={`approve-${user.id}`}>
                <Menus.Button icon={<PersonAddAltTwoToneIcon />}>
                  {statusToTagText[status] === "Deactivated"
                    ? "Activate "
                    : "Approve "}
                  user
                </Menus.Button>
              </Modal.Open>
            )}

            {statusToTagText[status] === "Pending" && (
              <Modal.Open opens="reject">
                <Menus.Button icon={<PersonOffTwoToneIcon />}>
                  Reject user
                </Menus.Button>
              </Modal.Open>
            )}

            {statusToTagText[status] === "Deactivated" && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete user</Menus.Button>
              </Modal.Open>
            )}

            {statusToTagText[status] === "Activated" && (
              <Modal.Open opens="deactivate">
                <Menus.Button icon={<PersonOffTwoToneIcon />}>
                  Deactivated user
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        {(statusToTagText[status] === "Pending" ||
          statusToTagText[status] === "Deactivated") && (
          <Modal.Window name={`approve-${user.id}`}>
            <ConfirmApprove
              resourceName="user"
              disabled={
                isApproving || isRejecting || isDeleting || isDeactivating
              }
              onConfirm={() => handleApproveUser(user)}
              key={user.roleId}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === "Pending" && (
          <Modal.Window name="reject" key={user.roleId}>
            <ConfirmReject
              resourceName="user"
              disabled={
                isApproving || isRejecting || isDeleting || isDeactivating
              }
              onConfirm={handleRejectUser}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === "Deactivated" && (
          <Modal.Window name="delete" key={user.roleId}>
            <ConfirmDelete
              resourceName="user"
              disabled={
                isApproving || isRejecting || isDeleting || isDeactivating
              }
              onConfirm={handleDeleteUser}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === "Activated" && (
          <Modal.Window name="deactivate" key={user.roleId}>
            <ConfirmDeactivate
              resourceName="user"
              resourceId={user.roleId}
              disabled={
                isApproving || isRejecting || isDeleting || isDeactivating
              }
              onConfirm={() => handleDeactivateUser(user)}
            />
          </Modal.Window>
        )}
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
