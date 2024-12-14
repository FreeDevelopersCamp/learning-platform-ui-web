import { useState } from 'react';
import styled from 'styled-components';

import { useCount } from '../../contexts/courses/CoursesContext';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Row from '../instructor/roadmaps/Row';
import Heading from '../instructor/roadmaps/Heading';
import Filterbar from '../instructor/Filterbar';
import Total from '../instructor/roadmaps/Total';
import DashboardLayout from '../instructor/DashboardLayout';
import CourseCard from './CourseCard';

import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(300, 1fr));
  gap: 10rem;
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

function InstructorCourses() {
  const { instructorData } = useInstructorData();
  const [filter, setFilter] = useState('All');
  const { count } = useCount();

  const { coursesIds = [] } = instructorData || {};

  if (!instructorData) return <Spinner />;

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  const title = 'Courses';
  const description =
    'Its time to roll up your sleeves—we learn best by doing. All of our courses are interactive, combining short videos with hands-on exercises.';

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
    { value: 'sql', label: 'SQL' },
    { value: 'excel', label: 'Excel' },
    { value: 'google-sheets', label: 'Google Sheets' },
    { value: 'html', label: 'Html' },
    { value: 'css', label: 'Css' },
    { value: 'tailwind-css', label: 'Tailwind CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'git', label: 'Git' },
    { value: 'docker', label: 'Docker' },
    { value: 'shell', label: 'Shell' },
    { value: 'spark', label: 'Spark' },
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'npm', label: 'Npm' },
    { value: 'vitest', label: 'Vitest' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'NodeJS' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'aws', label: 'AWS' },
    { value: 'others', label: '+Others' },
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
          {coursesIds.map((courseId) => (
            <CourseCard key={courseId} courseId={courseId} filter={filter} />
          ))}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default InstructorCourses;
