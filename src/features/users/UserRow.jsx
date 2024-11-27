import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

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

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function BookingRow({
  user: { _id: userId, userName, image, role, personalInformation, contacts },
  children,
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    pending: "blue",
    activated: "green",
    deactivated: "silver",
  };

  let roleCode;

  switch (role) {
    case "0":
      roleCode = "Admin";
      break;
    case "1":
      roleCode = "Owner";
      break;
    case "2":
      roleCode = "Manager";
      break;
    case "3":
      roleCode = "Account Manager";
      break;
    case "4":
      roleCode = "Content Manager";
      break;
    case "5":
      roleCode = "Instructor";
      break;
    case "6":
      roleCode = "Learner";
      break;
    default:
      roleCode = "Unknown";
      break;
  }

  if (!image) image = "../../../public/default-user.png";

  const status = "pending";

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

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

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
          </Menus.List>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
