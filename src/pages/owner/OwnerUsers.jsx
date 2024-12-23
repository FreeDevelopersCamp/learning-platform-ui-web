import { UserSelectionProvider } from '../../contexts/users/UserSelectionContext';

import UserTable from '../../features/users/usersTable/UserTable';
import UserTableOperations from '../../features/users/usersTable/UserTableOperations';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function OwnerUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <UserTable role="owner" />
      </UserSelectionProvider>
    </>
  );
}

export default OwnerUsers;
