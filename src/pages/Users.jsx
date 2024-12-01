import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import UserTable from '../../features/admin/users/usersTable/UserTable';
import UserTableOperations from '../../features/admin/users/usersTable/UserTableOperations';
import { UserSelectionProvider } from '../../contexts/admin/users/UserSelectionContext';

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <UserTable />
      </UserSelectionProvider>
    </>
  );
}

export default Users;
