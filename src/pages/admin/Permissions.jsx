import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import PermissionTable from '../../features/Admin/permissions/permissionsTable/PermissionTable';
import PermissionTableOperations from '../../features/Admin/permissions/permissionsTable/PermissionTableOperations';

function Permissions() {
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

export default Permissions;
