import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import PermissionTableOperations from '@/ui/Permissions/permissionsTable/PermissionTableOperations';
import PermissionTable from '@/ui/Permissions/permissionsTable/PermissionTable';

function ManagerPermissions() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Permissions</Heading>
        <PermissionTableOperations />
      </Row>
      <PermissionTable />
    </>
  );
}

export default ManagerPermissions;
