import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import RoadmapDetails from './RoadmapDetails';

import Row from './Row';
import DetailsHeading from './DetailsHeading';
import InstructorsSet from './InstructorsSet';
import DetailsCard from './DetailsCard';

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  gap: 35px;
  padding: 20px;
  height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    height: auto;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function ViewRoadmapDetails() {
  const { id } = useParams();

  return (
    <Row>
      <DetailsHeading roadmapId={id} />
      <Container>
        {/* <div style={{ display: 'flex' }}>
          <Description>
            <h2>Roadmap Description</h2>
            <p>{roadmapId.description}</p>
          </Description>
          <DetailsCard />
        </div>
        <InstructorsSet /> */}
      </Container>
    </Row>
  );
}

export default ViewRoadmapDetails;
