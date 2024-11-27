import { useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";

import { useUser } from "../../hooks/users/useUser";

import UserRow from "./UserRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { ColorCheckbox } from "../../ui/LabelledCheckbox";

function UserTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const { users, isLoading, count } = useUser();

  if (isLoading) return <Spinner />;
  if (!users?.length) return <Empty resourceName="users" />;

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedRows(users.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const isAllSelected = users.every((user) => selectedRows.includes(user.id));
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < users.length;

  return (
    <Menus>
      <Table columns="0.4fr 2.3fr 2.5fr 1.5fr 1.5fr 0.5fr ">
        <Table.Header>
          <div>
            <FormControlLabel
              control={
                <ColorCheckbox
                  color="default"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBoxIcon />}
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
                    onChange={() => handleCheckboxChange(user.id)}
                    checked={selectedRows.includes(user.id)}
                    icon={<CheckBoxOutlineBlank />}
                    checkedIcon={<CheckBoxIcon />}
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
