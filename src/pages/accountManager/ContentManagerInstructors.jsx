import { UserSelectionProvider } from '../../contexts/users/UserSelectionContext.jsx';

import Heading from '../../ui/Heading.jsx';
import Row from '../../ui/Row.jsx';
import UserTableOperations from '@/ui/User/usersTable/UserTableOperations.jsx';
import InstructorTable from '@/ui/ContentManger/instructorsTable/InstructorTable.jsx';

function ContentManagerUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <InstructorTable role="contentManager" />
      </UserSelectionProvider>
    </>
  );
}

export default ContentManagerUsers;
