import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useRoadmaps } from '../../hooks/roadmaps/useRoadmaps';

import Row from './Row';
import Heading from './Heading';
import Filterbar from './Filterbar';
import DashboardLayout from './DashboardLayout';
import RoadmapCard from './RoadmapCard';

import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  overflow: auto;
  margin-top: 2rem; /* ✅ Added margin-top to push roadmaps down */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const NoCoursesMessage = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  padding: 4rem 0;
`;

function Roadmaps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);

  const { userProgress } = useOutletContext();
  const { allRoadmaps, isAllRoadmapsLoading, allRoadmapsError } = useRoadmaps();

  useEffect(() => {
    if (!allRoadmaps?.items) return;

    const filtered = Object.values(allRoadmaps.items).filter((roadmap) =>
      roadmap.topic.toLowerCase().includes(searchQuery),
    );

    setFilteredRoadmaps(filtered);
  }, [searchQuery, allRoadmaps]);

  if (isAllRoadmapsLoading || allRoadmapsError) return <Spinner />;

  const title = 'Roadmaps';
  const description =
    'Our career tracks are hand-picked by industry experts. You will learn all you need to start a new career in the data science field.';

  return (
    <Row>
      <Heading title={title} description={description} />

      <FilterWrapper>
        <Filterbar onSearchChange={setSearchQuery} />
      </FilterWrapper>

      <DashboardLayout>
        <StyledDashboardLayout>
          {filteredRoadmaps.length > 0 ? (
            filteredRoadmaps.map((roadmap, index) => (
              <RoadmapCard
                key={roadmap.id || `${roadmap.topic}-${index}`}
                userProgress={userProgress}
                roadmap={roadmap}
              />
            ))
          ) : (
            <NoCoursesMessage>No roadmaps found.</NoCoursesMessage>
          )}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default Roadmaps;
