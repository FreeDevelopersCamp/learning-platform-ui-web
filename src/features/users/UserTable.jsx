import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ColorCheckbox } from "../../ui/LabelledCheckbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
// import { useDeleteUser } from "./useDeleteUser";
// import Button from "../../ui/Button";
import { useUser } from "./useUser";
import { PAGE_SIZE } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const { isDeleting, deleteBooking } = useDeleteUser();

  let { users, isLoading } = useUser();

  // Read page number from URL query params when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const page = parseInt(urlParams.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  if (isLoading) return <Spinner />;

  if (!users) return <Empty resourceName="users" />;

  const expandedUsers = users.flatMap((user) =>
    user.roles.map((role) => ({
      ...user,
      role,
      id: `${user._id}-${role}`, // Composite unique ID
      roles: undefined,
    }))
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all rows on the current page using the composite id
      const currentPageIds = expandedUsers
        .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        .map((user) => user.id);
      setSelectedRows(currentPageIds);
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // Remove the current 'page' parameter and set the new one
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", newPage); // Set or update the 'page' parameter

    // Update the URL with the new page number and any other query params (like 'status')
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  const currentPageUsers = expandedUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const isAllSelected = currentPageUsers.every((user) =>
    selectedRows.includes(user.id)
  );

  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < currentPageUsers.length;

  // const handleDeleteSelected = () => {
  //   if (selectedRows.length > 0) {
  //     deleteBooking(selectedRows);
  //   }
  //   setSelectedRows([]);
  // };

  return (
    <Menus>
      <Table columns="0.4fr 2.1fr 2.2fr 1.1fr 1.4fr 3.2rem">
        {/* Table Header */}
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
          data={currentPageUsers}
          render={(user) => (
            <BookingRow key={`${user.id}`} user={user}>
              <FormControlLabel
                control={
                  <ColorCheckbox
                    color="default"
                    onChange={() => handleCheckboxChange(user.id)} // Use composite id
                    checked={selectedRows.includes(user.id)} // Use composite id
                    icon={<CheckBoxOutlineBlank />}
                    checkedIcon={<CheckBoxIcon />}
                    size="large"
                  />
                }
              />
            </BookingRow>
          )}
        />

        {/* Table Footer */}
        <Table.Footer>
          <Pagination
            count={expandedUsers.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          >
            {/* Add Delete Button for Selected Rows */}
            {/* <Button
              onClick={handleDeleteSelected}
              disabled={isDeleting || selectedRows.length === 0}
              variation="danger"
            >
              {isDeleting ? "Deleting..." : "Delete Selected"}
            </Button> */}
          </Pagination>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;
