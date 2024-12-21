import FormControlLabel from '@mui/material/FormControlLabel';

import { useUserSelection } from '@/contexts/users/UserSelectionContext.jsx';
import { useListUser } from '@/apis/core/User/hooks/useListUser.js';

import UserRow from './UserRow.jsx';
import Table from '@/ui/Table.jsx';
import Menus from '@/ui/Menus.jsx';
import Empty from '@/ui/Empty.jsx';
import Spinner from '@/ui/Spinner.jsx';
import Pagination from '@/ui/Pagination.jsx';
import { ColorCheckbox } from '@/ui/LabelledCheckbox.jsx';

function UserTable({ role }) {
  const { selectedUsers, handleSelectUser, handleSelectAllUsers } =
    useUserSelection();

  const { users, isLoading, count } = useListUser();

  if (isLoading) return <Spinner />;
  if (!users?.length) return <Empty resourceName="Users Table" />;

  const isAllSelected = users.every((user) =>
    selectedUsers.includes(user.roleId),
  );
  const isIndeterminate =
    selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <Menus>
      <Table columns="0.4fr 2.3fr 2.5fr 1.5fr 1.5fr 0.5fr ">
        <Table.Header>
          <div>
            <FormControlLabel
              control={
                <ColorCheckbox
                  color="default"
                  onChange={(e) =>
                    handleSelectAllUsers(users, e.target.checked)
                  }
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  size="large"
                />
              }
              label=""
            />
          </div>
          <div>User</div>
          <div>Email</div>
          <div>Status</div>
          <div>Role</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => (
            <UserRow key={user.roleId} user={user} role={role}>
              <FormControlLabel
                control={
                  <ColorCheckbox
                    color="default"
                    onChange={() => handleSelectUser(user.roleId)}
                    checked={selectedUsers.includes(user.roleId)}
                    size="large"
                  />
                }
                label=""
              />
            </UserRow>
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;
