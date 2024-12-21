import { UserSelectionProvider } from '../../contexts/users/UserSelectionContext';

import UserTable from '../../ui/User/usersTable/UserTable';
import UserTableOperations from '../../ui/User/usersTable/UserTableOperations';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <UserTable role="admin" />
      </UserSelectionProvider>
    </>
  );
}

export default Users;
