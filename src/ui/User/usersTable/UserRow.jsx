import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HiEye, HiTrash } from 'react-icons/hi2';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import { IoMdCheckmarkCircle } from 'react-icons/io';

import { useUserSelection } from '@/contexts/users/UserSelectionContext.jsx';
import { useApproveUser } from '@/apis/core/useApproveUser.js';
import { useRejectUser } from '@/apis/core/useRejectUser.js';
import { useDeleteUser } from '@/apis/core/useDeleteUser.js';
import { useDeactivateUser } from '@/apis/core/useDeactivateUser.js';
import { useVerifyInstructor } from '@/apis/core/useVerifyInstructor.js';
import { getRoleCode } from '@/utils/helpers.js';

import ConfirmApprove from '@/ui/Buttons/ConfirmApprove.jsx';
import ConfirmReject from '@/ui/Buttons/ConfirmReject.jsx';
import ConfirmDeactivate from '@/ui/Buttons/ConfirmDeactivate.jsx';
import ConfirmDelete from '@/ui/Buttons/ConfirmDelete.jsx';
import Table from '@/ui/Tables/Table.jsx';
import Menus from '@/ui/Menus/Menus.jsx';
import Modal from '@/ui/Menus/Modal.jsx';
import UserAvatar from '../UserAvatar.jsx';
import Tag from '../Tag.jsx';

const Email = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
`;

const statusToTagName = {
  1: 'teal',
  2: 'lime',
  3: 'rose',
  4: 'brand',
};

const statusToTagText = {
  1: 'Pending',
  2: 'Activated',
  3: 'Deactivated',
  4: 'Verified',
};

function UserRow({ user, role: MainRole, children }) {
  let { userName, role, personalInformation, contacts, status } = user;

  const navigate = useNavigate();
  const { isApproving } = useApproveUser();
  const { isRejecting } = useRejectUser();
  const { isDeleting } = useDeleteUser();
  const { isDeactivating } = useDeactivateUser();
  const { isVerifying } = useVerifyInstructor();

  const isLoading =
    isApproving ||
    isRejecting ||
    isDeleting ||
    isVerifying ||
    isDeleting ||
    isDeactivating;

  const { selectedUsers, handleSelectUser, handleUserAction } =
    useUserSelection();

  let roleCode = getRoleCode(role);
  const [pendingAction, setPendingAction] = useState(null); // Tracks the current action

  useEffect(() => {
    if (selectedUsers?.length && pendingAction) {
      handleUserAction(pendingAction);
      setPendingAction(null); // Reset action after handling
    }
  }, [selectedUsers, pendingAction, handleUserAction]);

  async function handleUserActionWrapper(roleId, actionType) {
    if (!selectedUsers?.length) {
      await handleSelectUser(roleId);
    }
    setPendingAction(actionType); // Set the desired action
  }

  return (
    <Table.Row>
      {children}

      <div className="flex gap-4">
        <UserAvatar user={user} />
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
          <Menus.Toggle id={user.roleId} />
          <Menus.List id={user.roleId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/profile?username=${user.userName}`)}
            >
              See details
            </Menus.Button>

            {(statusToTagText[status] === 'Pending' ||
              statusToTagText[status] === 'Verified' ||
              statusToTagText[status] === 'Deactivated') && (
              <Modal.Open opens={`approve-${user.roleId}`}>
                <Menus.Button
                  key={`${user.roleId}`}
                  icon={<PersonAddAltTwoToneIcon />}
                >
                  {statusToTagText[status] === 'Deactivated'
                    ? 'Activate '
                    : 'Approve '}
                  user
                </Menus.Button>
              </Modal.Open>
            )}

            {statusToTagText[status] === 'Pending' && (
              <Modal.Open opens={`reject-${user.roleId}`}>
                <Menus.Button icon={<PersonOffTwoToneIcon />}>
                  Reject user
                </Menus.Button>
              </Modal.Open>
            )}

            {statusToTagText[status] === 'Deactivated' &&
              MainRole === 'admin' && (
                <Modal.Open opens={`delete-${user.roleId}`}>
                  <Menus.Button icon={<HiTrash />}>Delete user</Menus.Button>
                </Modal.Open>
              )}

            {statusToTagText[status] === 'Activated' &&
              role === '5' &&
              MainRole === 'accountManager' && (
                <Modal.Open opens={`verify-${user.roleId}`}>
                  <Menus.Button icon={<IoMdCheckmarkCircle />}>
                    Verify Instructor
                  </Menus.Button>
                </Modal.Open>
              )}

            {statusToTagText[status] === 'Activated' && (
              <Modal.Open opens={`deactivate-${user.roleId}`}>
                <Menus.Button icon={<PersonOffTwoToneIcon />}>
                  Deactivate user
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        {(statusToTagText[status] === 'Pending' ||
          statusToTagText[status] === 'Verified' ||
          statusToTagText[status] === 'Deactivated') && (
          <Modal.Window
            name={`approve-${user.roleId}`}
            key={`approveKey-${user.roleId}`}
          >
            <ConfirmApprove
              resourceName="user"
              disabled={isLoading}
              onConfirm={() => handleUserActionWrapper(user.roleId, 'approve')}
              key={user.roleId}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === 'Pending' && (
          <Modal.Window
            name={`reject-${user.roleId}`}
            key={`rejectKey-${user.roleId}`}
          >
            <ConfirmReject
              resourceName="user"
              disabled={isLoading}
              onConfirm={() => handleUserActionWrapper(user.roleId, 'reject')}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === 'Deactivated' && (
          <Modal.Window
            name={`delete-${user.roleId}`}
            key={`deleteKey-${user.roleId}`}
          >
            <ConfirmDelete
              resourceName="user"
              disabled={isLoading}
              onConfirm={() => handleUserActionWrapper(user.roleId, 'delete')}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === 'Activated' && role === '5' && (
          <Modal.Window
            name={`verify-${user.roleId}`}
            key={`verifyKey-${user.roleId}`}
          >
            <ConfirmApprove
              resourceName="user"
              disabled={isLoading}
              onConfirm={() => handleUserActionWrapper(user.roleId, 'verify')}
            />
          </Modal.Window>
        )}

        {statusToTagText[status] === 'Activated' && (
          <Modal.Window
            name={`deactivate-${user.roleId}`}
            key={`deactivateKey-${user.roleId}`}
          >
            <ConfirmDeactivate
              resourceName="user"
              resourceId={user.roleId}
              disabled={isLoading}
              onConfirm={() =>
                handleUserActionWrapper(user.roleId, 'deactivate')
              }
            />
          </Modal.Window>
        )}
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
