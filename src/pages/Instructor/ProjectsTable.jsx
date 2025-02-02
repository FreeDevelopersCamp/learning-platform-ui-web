import { useGetInstructor } from '../../apis/core/Instructor/hooks/useGetInstructor';
import { useListProject } from '../../apis/learn/Project/hooks/useListProject';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useAuth } from '../../contexts/auth/AuthContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import ProjectTable from '../../ui/ProjectsTable/ProjectTable';
import Modal from '../../ui/Menus/Modal';
import Button from '../../ui/Buttons/Button';
import CreateProjectForm from '../../ui/ProjectsTable/CreateProjectForm';

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
        <Modal>
          <Modal.Open opens="create-project">
            <Button variation="primary">Add New Project</Button>
          </Modal.Open>
          <Modal.Window name="create-project">
            <CreateProjectForm instructorId={instructor._id} />
          </Modal.Window>
        </Modal>
      </Row>
      <ProjectTable projects={instructorProjects} count={count} />
    </>
  );
}

export default ProjectsTable;
