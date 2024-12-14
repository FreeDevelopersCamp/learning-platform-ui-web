import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRoadmap } from '../../../hooks/roadmaps/useRoadmap';

import Row from './Row';
import DetailsHeading from './DetailsHeading';
import InstructorsSet from './InstructorsSet';
import OrderCards from './OrderCards';

import Spinner from '../../../ui/Spinner';

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto 1fr;
  width: 100%;
  padding: 20px 0;
  gap: 2rem;
`;

const OrderCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 1.7rem;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;

const InstructorsSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 200px;
  box-sizing: border-box;
`;

function ViewRoadmapDetails() {
  const { id } = useParams();
  const { roadmap, roadmapLoading, roadmapError } = useRoadmap(id);

  if (roadmapLoading || !roadmap || roadmapError) return <Spinner />;

  const {
    name,
    description,
    duration,
    coursesIds = [],
    projectsIds = [],
    practicesIds = [],
    participants = 0,
    topic,
    order = [],
    instructor,
  } = roadmap;

  const orderCards = [];

  order.forEach((item) => {
    if (!item || !item._id) {
      console.warn('Skipping invalid item:', item);
      return;
    }

    if (coursesIds.includes(item._id)) {
      orderCards.push({
        id: item._id,
        type: 'course',
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
      });
    } else if (projectsIds.includes(item._id)) {
      orderCards.push({
        id: item._id,
        type: 'project',
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
      });
    } else if (practicesIds.includes(item._id)) {
      orderCards.push({
        id: item._id,
        type: 'practice',
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
      });
    } else if (participants === item._id) {
      orderCards.push({
        id: item._id,
        type: 'participant',
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
      });
    }
  });

  return (
    <Row>
      <DetailsHeading roadmap={roadmap} />
      <Container>
        <OrderCardsContainer>
          <Title>Description</Title>
          <Description>{description}</Description>
          {orderCards.map((card, index) => (
            <OrderCards
              key={index}
              index={index}
              orderId={card.id}
              type={card.type}
              name={card.name}
              description={card.description}
              duration={card.duration}
              xp={card.xp}
            />
          ))}
        </OrderCardsContainer>

        <InstructorsSetContainer>
          <InstructorsSet instructor={instructor} />
        </InstructorsSetContainer>
      </Container>
    </Row>
  );
}

export default ViewRoadmapDetails;
