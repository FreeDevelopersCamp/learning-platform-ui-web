import { useGetInstructor } from '../../apis/core/Instructor/hooks/useGetInstructor';
import { useListProject } from '../../apis/learn/Project/hooks/useListProject';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useAuth } from '../../contexts/auth/AuthContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import ProjectTable from '../../ui/ProjectsTable/ProjectTable';

function ProjectsTable() {
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { instructor, instructorLoading } = useGetInstructor(user?._id);
  const {
    instructorProjects,
    isLoading: projectLoading,
    count,
  } = useListProject(instructor?._id);

  if (isLoading || userLoading || instructorLoading || projectLoading)
    return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Projects</Heading>
        {/* <UserTableOperations /> */}
      </Row>
      <ProjectTable projects={instructorProjects} count={count} />
    </>
  );
}

export default ProjectsTable;
