import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Progress from '../../ui/Progress';

import { FaCheckCircle } from 'react-icons/fa';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--color-grey-50);
  color: var(--color-mutedblue-900);
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  cursor: pointer;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0px 2px 10px 0 var(--color-grey-300);
    transform: translateY(-2px);
  }
`;

const Type = styled.p`
  color: var(--color-grey-500);
  font-size: 1.1rem;
  text-transform: capitalize;
  letter-spacing: 0.2rem;
  padding-bottom: 0.4rem;
`;

const Topic = styled.div`
  color: var(--color-grey-800);
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.p`
  padding-top: 1rem;
  font-size: 1.5rem;
  color: var(--color-grey-600);
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0 auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-grey-300);
  z-index: 1;
`;

const Count = styled.div`
  color: var(--color-grey-600);
  font-size: 1.5rem;
`;

const ViewAccomplishment = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6em;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-grey-800);
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-grey-500);

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const Continue = styled.button`
  width: 110px;
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-mutedblue-900);
  background-color: var(--color-light-green-500);

  &:hover {
    background-color: var(--color-light-green-600);
  }
`;

const Button = styled.button`
  width: 110px;
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.4rem;
  color: var(--color-grey-800);
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-grey-500);

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function RoadmapCard({ userProgress, roadmap }) {
  const navigate = useNavigate();

  const { _id, description, coursesIds = [], topic, order = [] } = roadmap;

  const {
    currentRoadmapsIds = [],
    completedCoursesIds = [],
    progress,
  } = userProgress || {};

  const isCurrent = currentRoadmapsIds.includes(_id);

  const handleContinue = () => {
    // Find the first incomplete course
    const nextCourse = order.find(
      (course) => !completedCoursesIds.includes(course._id),
    );

    if (nextCourse) {
      const courseTitle = nextCourse.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      navigate(
        `/courses/${topic.toLowerCase().replace(/\s+/g, '-')}/${_id}/${courseTitle}/${nextCourse._id}`,
      );
    } else {
      navigate(`/roadmap/${_id}`);
    }
  };

  const handleViewDetails = () => {
    navigate(`/roadmap/${_id}`);
  };

  return (
    <Card>
      <Type>ROADMAP</Type>
      <Topic>{topic || 'Roadmap Topic'}</Topic>
      <Description>{description || 'No description available.'}</Description>

      <Details>
        {isCurrent ? (
          <>
            <Progress percentage={progress} />
            <Continue onClick={handleContinue}>Continue</Continue>
          </>
        ) : (
          <>
            <Count>{coursesIds.length} Courses</Count>
            <Button onClick={handleViewDetails}>View Details</Button>
          </>
        )}
      </Details>
    </Card>
  );
}

export default RoadmapCard;
