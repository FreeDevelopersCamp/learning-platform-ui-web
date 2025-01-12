import { useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';

import { useCount } from '../../contexts/projects/ProjectsContext';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Row from './Row';
import Heading from './Heading';
import Filterbar from './Filterbar';
import Total from '../roadmaps/Total';
import DashboardLayout from './DashboardLayout';
import ProjectCard from './ProjectCard';

import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(300, 1fr));
  gap: 10rem;
  overflow: auto;
  padding-top: ${(props) => (props.isFilterbarFixed ? '5.5rem' : '0')};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

function Projects() {
  const [filter, setFilter] = useState('all');
  const { count } = useCount();
  const { instructorData } = useInstructorData();
  const { session, userProgress } = useOutletContext();

  const { projectsIds = [] } = instructorData || {};

  if (!instructorData) return <Spinner />;

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  const title = 'Projects';
  const description =
    'Transform your knowledge into real-world solutions by working on hands-on projects that challenge and inspire you!';

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'version-control', label: 'Version Control' },
    { value: 'c++', label: 'C++' },
    { value: 'sql', label: 'SQL' },
    { value: 'excel', label: 'Excel' },
    { value: 'html', label: 'Html' },
    { value: 'css', label: 'Css' },
    { value: 'tailwind-css', label: 'Tailwind CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'git', label: 'Git' },
    { value: 'docker', label: 'Docker' },
  ];

  return (
    <Row>
      <Heading title={title} description={description} />
      <Filterbar
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      >
        <Total filter={filter} count={count} />
      </Filterbar>
      <DashboardLayout>
        <StyledDashboardLayout>
          {projectsIds.map((projectId) => {
            return (
              <ProjectCard
                key={projectId}
                projectId={projectId}
                filter={filter}
                role={session.role}
                userProgress={userProgress}
              />
            );
          })}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default Projects;
