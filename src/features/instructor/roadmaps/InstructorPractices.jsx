import { useState } from 'react';
import styled from 'styled-components';

import { useCount } from '../../../contexts/practices/PracticesContext';
import { useInstructorData } from '../../../contexts/instructor/InstructorContext';

import Row from './Row';
import Heading from './Heading';
import Filterbar from '../Filterbar';
import Total from '../roadmaps/Total';
import DashboardLayout from '../DashboardLayout';
import PracticeCard from './PracticeCard';

import Spinner from '../../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(350, 1fr));
  gap: 2rem;
  overflow: auto;
  flex-grow: 1;
  transform: translatex(4px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

function InstructorPractices() {
  const [filter, setFilter] = useState('Practices');
  const { count } = useCount();
  const { instructorData } = useInstructorData();

  const { practicesIds = [] } = instructorData || {};

  if (!instructorData) return <Spinner />;

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  const title = 'Practices';
  const description =
    'How do your skills stack up? Discover your skill level in just a few minutes to get personalized learning recommendations.';

  const filterOptions = [
    { value: 'Practices', label: 'All' },
    { value: 'python', label: 'Python' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'Html' },
    { value: 'css', label: 'Css' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'git', label: 'Git' },
    { value: 'react', label: 'React' },
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
          {practicesIds.map((practiceId) => (
            <PracticeCard
              key={practiceId}
              practiceId={practiceId}
              filter={filter}
            />
          ))}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default InstructorPractices;
