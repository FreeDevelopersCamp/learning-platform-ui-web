import { useState } from 'react';
import styled from 'styled-components';
import { useCount } from '../../../contexts/projects/ProjectsContext';
import { useInstructorData } from '../../../contexts/instructor/InstructorContext';

import Row from './Row';
import Heading from './Heading';
import Filterbar from '../../instructor/Filterbar';
import Total from '../roadmaps/Total';
import DashboardLayout from '../../instructor/DashboardLayout';
import ProjectCard from '../../projects/ProjectCard';

import Spinner from '../../../ui/Spinner';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth/AuthContext';
import { useListProject } from '../../../apis/learn/Project/hooks/useListProject';
import { useGetUser } from '../../../apis/core/User/hooks/useGetUser';
import { useGetInstructor } from '../../../apis/core/Instructor/hooks/useGetInstructor';

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

function InstructorProjects() {
  const [filter, setFilter] = useState('all');
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { instructor, instructorLoading } = useGetInstructor(user?._id);
  const {
    projectsData,
    isLoading: projectsLoading,
    count,
  } = useListProject(instructor?._id);

  if (userLoading || instructorLoading || projectsLoading || isLoading)
    return <Spinner />;

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

  console.log(projectsData);

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
          {projectsData?.map((project) => (
            <ProjectCard
              key={project._id}
              projectId={project._id}
              filter={filter}
              role={session.role}
            />
          ))}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default InstructorProjects;
