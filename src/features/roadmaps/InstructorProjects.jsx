import styled from 'styled-components';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';

import ProjectsCard from './ProjectCard';
import ProjectsFilter from './ProjectsFilter';

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 40px;
  padding: 20px 20px 0 20px;
  height: 80vh;
  overflow-y: auto;
  margin: 0 auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid transparent;
  }
`;

function InstructorProjects() {
  const { instructorData } = useInstructorData();

  const { projectsIds = [] } = instructorData || {};

  if (!instructorData) return <Spinner />;

  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Projects</Heading>
        <ProjectsFilter />
      </Row>
      <ProjectsContainer>
        {projectsIds.map((projectId) => (
          <ProjectsCard key={projectId} projectId={projectId} />
        ))}
      </ProjectsContainer>
    </>
  );
}

export default InstructorProjects;
