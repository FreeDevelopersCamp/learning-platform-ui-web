import PermissionTable from '../../features/permissions/permissionsTable/PermissionTable';
import PermissionTableOperations from '../../features/permissions/permissionsTable/PermissionTableOperations';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

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
