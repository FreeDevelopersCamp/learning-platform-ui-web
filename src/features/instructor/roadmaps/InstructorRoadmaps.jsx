import { useEffect, useState } from 'react';
import { useInstructorData } from '../../../contexts/instructor/InstructorContext';
import styled from 'styled-components';

import Row from './Row';
import Heading from './Heading';
import Filterbar from '../Filterbar';
import Total from './Total';
import DashboardLayout from '../DashboardLayout';
import RoadmapCard from './RoadmapCard';

import Spinner from '../../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(250, 1fr));
  gap: 3rem;
  overflow: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

function InstructorRoadmaps() {
  const { instructorData } = useInstructorData();
  const [filter, setFilter] = useState('all');
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [filterCount, setFilterCount] = useState(0);

  const { roadmapsIds = [] } = instructorData || {};

  useEffect(() => {
    if (!roadmapsIds) return;

    const filtered = Object.values(roadmapsIds).filter((roadmap) => {
      return filter === 'all' || (roadmap.topic && roadmap.topic === filter);
    });

    setFilteredRoadmaps(filtered);
    setFilterCount(filtered.length);
  }, [filter, roadmapsIds]);

  if (!instructorData) return <Spinner />;

  const title = 'Roadmaps';
  const description =
    'Our career tracks are hand-picked by industry experts. You will learn all you need to start a new career in the data science field.';

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'data-engineer', label: 'Data Engineer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'ml-scientist', label: 'ML Scientist' },
    { value: 'ml-engineer', label: 'ML Engineer' },
    { value: 'ai-engineer', label: 'AI Engineer' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'statistician', label: 'Statistician' },
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
      >
        <Total filter={filter} count={filterCount} />
      </Filterbar>
      <DashboardLayout>
        <StyledDashboardLayout>
          {filter === 'all'
            ? roadmapsIds.map((roadmapId) => (
                <RoadmapCard key={roadmapId} roadmapId={roadmapId} />
              ))
            : filteredRoadmaps.length > 0 &&
              filteredRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.id} roadmapId={roadmap.id} />
              ))}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default InstructorRoadmaps;
