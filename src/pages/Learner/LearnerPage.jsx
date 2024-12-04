import styled from 'styled-components';
import MainSection from './ui/MainSection';
import ProgressSection from './ui/ProgressSection';
import RoadmapAnnouncement from './ui/RoadmapAnnouncement';
import Stats from './ui/Stats';

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  gap: 2.5rem;
  height: auto;
`;

function LearnerPage() {
  return (
    <Container>
      <div>
        <Stats />
        <MainSection />
      </div>
      <div className="flex flex-col gap-4">
        <ProgressSection />
        <RoadmapAnnouncement />
      </div>
    </Container>
  );
}

export default LearnerPage;
