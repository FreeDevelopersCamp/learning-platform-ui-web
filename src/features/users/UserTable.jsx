import FormControlLabel from "@mui/material/FormControlLabel";

import { useUserSelection } from "../../context/UserSelectionContext";
import { useUser } from "../../hooks/users/useUser";

import UserRow from "./UserRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { ColorCheckbox } from "../../ui/LabelledCheckbox";

function UserTable() {
  const { users, isLoading, count } = useUser();
  const { selectedUsers, handleSelectUser, handleSelectAllUsers } =
    useUserSelection();

  if (isLoading) return <Spinner />;
  if (!users?.length) return <Empty resourceName="users" />;

  const isAllSelected = users.every((user) => selectedUsers.includes(user.id));
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
            <UserRow key={user.id} user={user}>
              <FormControlLabel
                control={
                  <ColorCheckbox
                    color="default"
                    onChange={() => handleSelectUser(user.id)}
                    checked={selectedUsers.includes(user.id)}
                    size="large"
                  />
                }
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
