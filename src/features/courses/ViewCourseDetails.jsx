import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCourse } from '../../hooks/courses/useCourse';

import Row from '../roadmaps/Row';
import DetailsHeading from './DetailsHeading';
import OrderCard from './OrderCard';
// import InstructorsSet from '../roadmaps/InstructorsSet';

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
  gap: 2rem;
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
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 200px;
  box-sizing: border-box;
`;
function ViewRoadmapDetails() {
  const { id } = useParams();
  const { course, courseLoading, courseError } = useCourse(id);

  if (courseLoading || !course || courseError) return <Spinner />;

  const {
    _id,
    name,
    description,
    category,
    topic,
    status,
    duration,
    instructorId,
    resources = [],
    tips = [],
    subCourses = [],
    xp,
    created,
    updated,
    raters = [],
    rating,
  } = course;

  return (
    <Row>
      <DetailsHeading course={course} />
      <Container>
        <OrderCardsContainer>
          <Title>Description</Title>
          <Description>{description}</Description>
          {subCourses.map((course, index) => (
            <OrderCard key={index} index={index + 1} course={course} />
          ))}
        </OrderCardsContainer>

        <InstructorsSetContainer>
          {/* <InstructorsSet instructor={instructor} /> */}
          resourses
        </InstructorsSetContainer>
      </Container>
    </Row>
  );
}

export default ViewRoadmapDetails;
