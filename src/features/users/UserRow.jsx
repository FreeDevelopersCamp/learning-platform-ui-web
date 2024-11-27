import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiEye, HiTrash } from "react-icons/hi2";
import { FcCancel, FcCheckmark } from "react-icons/fc";

import { useApproveUser } from "./useApproveUser";
import { useRejectUser } from "./useRejectUser";
import { useDeleteUser } from "./useDeleteUser";

import ConfirmApprove from "../../ui/ConfirmApprove";
import ConfirmReject from "../../ui/ConfirmReject";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
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

function UserRow({
  user: {
    _id: userId,
    userName,
    image,
    role,
    personalInformation,
    contacts,
    status,
  },
  children,
}) {
  const navigate = useNavigate();
  const { isApproving, approveUser } = useApproveUser();
  const { isRejecting, rejectUser } = useRejectUser();
  const { isDeleting, deleteUser } = useDeleteUser();

  if (!image) image = "../../../public/default-user.png";

  let roleCode = getRoleCode(role);

  return (
    <Table.Row>
      {children}

      <div className="flex gap-4">
        <img className="w-14 h-14" src={image} alt={userName} />
        <Stacked>
          <span>{`${personalInformation.name.first} ${personalInformation.name.last}`}</span>
          <span>{userName}</span>
        </Stacked>
      </div>

      <User>{contacts.email}</User>

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
              <Modal.Open opens="approve">
                <Menus.Button icon={<FcCheckmark />}>
                  {statusToTagText[status] === "Deactivated"
                    ? "Activate "
                    : "Approve "}
                  user
                </Menus.Button>
              </Modal.Open>
            )}

            {(statusToTagText[status] === "Pending" ||
              statusToTagText[status] === "Activated") && (
              <Modal.Open opens="reject">
                <Menus.Button icon={<FcCancel />}>
                  {statusToTagText[status] === "Activated"
                    ? "Deactivate "
                    : "Reject "}
                  user
                </Menus.Button>
              </Modal.Open>
            )}

            {statusToTagText[status] === "Deactivated" && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete user</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        {(statusToTagText[status] === "Pending" ||
          statusToTagText[status] === "Deactivated") && (
          <Modal.Window name="approve">
            <ConfirmApprove
              resourceName="user"
              disabled={isApproving || isRejecting || isDeleting}
              onConfirm={approveUser}
            />
          </Modal.Window>
        )}

        {(statusToTagText[status] === "Pending" ||
          statusToTagText[status] === "Activated") && (
          <Modal.Window name="reject">
            <ConfirmReject
              resourceName="user"
              disabled={isApproving || isRejecting || isDeleting}
              onConfirm={rejectUser}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === "Deactivated" && (
          <Modal.Window name="delete">
            <ConfirmReject
              resourceName="user"
              disabled={isApproving || isRejecting || isDeleting}
              onConfirm={deleteUser}
            />
          </Modal.Window>
        )}
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
