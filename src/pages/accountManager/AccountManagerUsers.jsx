import { UserSelectionProvider } from '../../contexts/users/UserSelectionContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import UserTableOperations from '@/ui/User/usersTable/UserTableOperations';
import UserTable from '@/ui/User/usersTable/UserTable';

function AccountManagerUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <UserTable role="accountManager" />
      </UserSelectionProvider>
    </>
  );
}

export default AccountManagerUsers;