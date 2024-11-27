import SortBy from "../../ui/SortBy.jsx";
import Filter from "../../ui/Filter.jsx";
import FilterList from "../../ui/FilterList.jsx";
import TableOperations from "../../ui/TableOperations.jsx";

function UserTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "activated", label: "Active" },
          { value: "deactivated", label: "Inactive" },
        ]}
      />

      <FilterList
        filterField="role"
        options={[
          { value: "all", label: "All" },
          { value: "admin", label: "Admin" },
          { value: "owner", label: "System Owner" },
          { value: "manager", label: "Manager" },
          { value: "account-manager", label: "Account Manager" },
          { value: "content-manager", label: "Content Manager" },
          { value: "instructor", label: "Instructor" },
          { value: "learner", label: "Learner" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-desc", label: "Sort by name (A - Z)" },
          { value: "name-asc", label: "Sort by name (Z - A)" },
          {
            value: "role-desc",
            label: "Sort by role (Admin first)",
          },
          { value: "role-asc", label: "Sort by role (Learner first)" },
        ]}
      />
    </TableOperations>
  );
}

export default UserTableOperations;
