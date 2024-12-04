import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import UserTable from '../../features/admin/users/usersTable/UserTable';
import UserTableOperations from '../../features/admin/users/usersTable/UserTableOperations';

import { useInstructorData } from '../../contexts/instructor/InstructorContext';

function Roadmaps() {
  const { instructorData } = useInstructorData();

  if (!instructorData)
    return (
      <p>No instructor data available. Please visit the dashboard first.</p>
    );

  return (
    <>
      <h1>{instructorData.name}'s Roadmaps</h1>
      {/* <Row type="horizontal">
        <Heading as="h1">Roadmaps</Heading>
        <UserTableOperations />
      </Row>
      <UserTable /> */}
    </>
  );
}

export default Roadmaps;
