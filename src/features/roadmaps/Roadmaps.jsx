import styled from 'styled-components';

import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import RoadmapCard from './RoadmapCard';
import Heading from './Heading';

import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';

const RoadmapContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  gap: 35px;
  padding: 20px;
  height: 80vh;
  overflow-y: auto;

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

function Roadmaps() {
  const { instructorData } = useInstructorData();

  const { roadmapsIds = [] } = instructorData || {};

  if (!instructorData) return <Spinner />;

  return (
    <>
      <Row type="vertical">
        <RoadmapContainer>
          <Heading>Roadmaps</Heading>
          {roadmapsIds.map((roadmapId) => (
            <RoadmapCard key={roadmapId} roadmapId={roadmapId} />
          ))}
        </RoadmapContainer>
      </Row>
    </>
  );
}

export default Roadmaps;
