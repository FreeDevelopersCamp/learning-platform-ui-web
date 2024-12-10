import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import UserTable from '../../features/Admin/users/usersTable/UserTable';
import UserTableOperations from '../../features/Admin/users/usersTable/UserTableOperations';
import { UserSelectionProvider } from '../../contexts/admin/users/UserSelectionContext';
import styled from 'styled-components';

const StyledPage = styled.div`
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`;

function Users() {
  return (
    <StyledPage>
      <Row type="horizontal">
        <Heading as="h1">All users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <UserTable />
      </UserSelectionProvider>
    </StyledPage>
  );
}

export default Users;
