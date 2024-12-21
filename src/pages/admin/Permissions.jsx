import PermissionTable from '../../ui/Permissions/permissionsTable/PermissionTable';
import PermissionTableOperations from '../../ui/Permissions/permissionsTable/PermissionTableOperations';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function Permissions() {
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

export default Permissions;
