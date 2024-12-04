import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import UserTable from '../../features/Admin/users/usersTable/UserTable';
import UserTableOperations from '../../features/Admin/users/usersTable/UserTableOperations';
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
