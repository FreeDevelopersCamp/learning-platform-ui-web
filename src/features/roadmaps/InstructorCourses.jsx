import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Row from './Row';
import Heading from './Heading';
import Filterbar from '../instructor/Filterbar';
import DashboardLayout from '../instructor/DashboardLayout';
import CourseCard from './CourseCard';

import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(300, 1fr));
  gap: 3rem;
  overflow: auto;
  flex-grow: 1;
  transform: translatex(13px);

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
  const [filter, setFilter] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filterCount, setFilterCount] = useState(0);

  const { coursesIds = [] } = instructorData || {};

  useEffect(() => {
    if (!coursesIds) return;

    const filtered = Object.values(coursesIds).filter((courses) => {
      return (
        filter === 'all' ||
        (courses.topic &&
          courses.topic.toLowerCase().replace(/\s+/g, '-') === filter)
      );
    });

    setFilteredCourses(filtered);
    setFilterCount(filtered.length);
  }, [filter, coursesIds]);

  if (!instructorData) return <Spinner />;

  const title = 'Courses';
  const description =
    'It’s time to roll up your sleeves—we learn best by doing. All of our courses are interactive, combining short videos with hands-on exercises.';

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
    { value: 'javascript', label: 'JavaScript' },
    { value: 'git', label: 'Git' },
    { value: 'docker', label: 'Docker' },
    { value: 'shell', label: 'Shell' },
    { value: 'spark', label: 'Spark' },
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'NodeJS' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'aws', label: 'AWS' },
    { value: 'others', label: '+Others' },
  ];

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  return (
    <Row>
      <Heading title={title} description={description} />
      <Filterbar
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        filter={filter}
        count={filterCount}
      />
      <DashboardLayout>
        <StyledDashboardLayout>
          {filter === 'all' ? (
            coursesIds.map((courseId) => (
              <CourseCard key={courseId} courseId={courseId} />
            ))
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} courseId={course.id} />
            ))
          ) : (
            <div
              style={{ width: '100%', height: '15vh', padding: '20px' }}
            ></div>
          )}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default InstructorCourses;
