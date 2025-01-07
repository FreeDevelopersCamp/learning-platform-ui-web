import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import {
  useFetchRoadmapById,
  useUpdateRoadmap,
} from '../../hooks/roadmaps/useRoadmap';
import { useUpdateProgress } from '../../hooks/learner/useProgress';

import Row from './Row';
import DetailsHeading from './DetailsHeading';
import InstructorsSet from './InstructorsSet';
import OrderCards from './OrderCards';
import ProgressBar from './ProgressBar';

import Spinner from '../../ui/Spinner';

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
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  height: 200px;
  box-sizing: border-box;
`;

function ViewRoadmapDetails() {
  const [percentage, setPercentage] = useState(0);

  const { session, userProgress } = useOutletContext();
  const { id } = useParams();

  const {
    data: roadmap,
    isLoading: isLoadingRoadmap,
    error: errorRoadmap,
  } = useFetchRoadmapById(id);

  const { mutate: updateRoadmap } = useUpdateRoadmap();
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  if (isLoadingRoadmap || !roadmap || errorRoadmap || updatingProgress) {
    return <Spinner />;
  }

  const {
    description,
    coursesIds = [],
    projectsIds = [],
    practicesIds = [],
    participants = 0,
    order = [],
    instructor,
  } = roadmap;

  const orderCards = order
    .filter((item) => item && !practicesIds.includes(item._id)) // Skip practices
    .map((item) => {
      const type = coursesIds.includes(item._id)
        ? 'course'
        : projectsIds.includes(item._id)
          ? 'project'
          : 'participant';

      return {
        id: item._id,
        type,
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
      };
    });

  return (
    <Row>
      <DetailsHeading
        roadmap={roadmap}
        updateRoadmap={updateRoadmap}
        session={session}
        userProgress={userProgress}
        updateProgress={updateProgress}
        role={session.role}
      >
        {session.role === '6' && <ProgressBar percentage={percentage} />}
      </DetailsHeading>
      <Container>
        <OrderCardsContainer>
          <Title>Description</Title>
          <Description>{description}</Description>
          {orderCards.map((card, index) => (
            <OrderCards
              key={index}
              index={index + 1}
              orderId={card.id}
              type={card.type}
              name={card.name}
              description={card.description}
              duration={card.duration}
              xp={card.xp}
              role={session.role}
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
