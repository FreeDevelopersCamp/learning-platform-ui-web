import SortBy from '../../Tables/SortBy.jsx';
import FilterList from '../../Tables/FilterList.jsx';
import TableOperations from '../../Tables/TableOperations.jsx';

function PermissionTableOperations() {
  return (
    <TableOperations>
      <FilterList
        filterField="role"
        options={[
          { value: 'all', label: 'All' },
          { value: 'admin', label: 'Admin' },
          { value: 'owner', label: 'System Owner' },
          { value: 'manager', label: 'Manager' },
          { value: 'account-manager', label: 'Account Manager' },
          { value: 'content-manager', label: 'Content Manager' },
          { value: 'instructor', label: 'Instructor' },
          { value: 'learner', label: 'Learner' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A - Z)' },
          { value: 'name-desc', label: 'Sort by name (Z - A)' },
          {
            value: 'role-asc',
            label: 'Sort by role (Admin first)',
          },
          { value: 'role-desc', label: 'Sort by role (Learner first)' },
        ]}
      />
    </TableOperations>
  );
}

export default PermissionTableOperations;
