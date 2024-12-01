import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import PermissionTable from '../../features/admin/permissions/permissionsTable/PermissionTable';
import PermissionTableOperations from '../../features/admin/permissions/permissionsTable/PermissionTableOperations';

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All permissions</Heading>
        <PermissionTableOperations />
      </Row>
      <PermissionTable />
    </>
  );
}

export default Users;
