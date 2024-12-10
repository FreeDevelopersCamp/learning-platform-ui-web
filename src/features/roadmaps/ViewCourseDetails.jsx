import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCourse } from '../../hooks/courses/useCourse';

import Row from './Row';
import DetailsHeading from './DetailsHeading';
import InstructorsSet from './InstructorsSet';
import OrderCards from './OrderCards';

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
  font-size: 1.5rem;
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
    resources = [], // Default to an empty array if not provided
    tips = [], // Default to an empty array if not provided
    subCoursesIds = [], // Default to an empty array if not provided
    xp,
    created,
    updated,
    raters = [], // Default to an empty array if not provided
    rating,
  } = course;

  const orderCards = [];

  // order.forEach((item) => {
  //   if (coursesIds.includes(item._id)) {
  //     orderCards.push({
  //       id: item._id,
  //       type: 'course',
  //       name: item.name,
  //       description: item.description,
  //       duration: item.duration,
  //       xp: item.xp,
  //     });

  return <Row>ViewRoadmapDetails</Row>;
}

export default ViewRoadmapDetails;
