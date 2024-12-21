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

  const {
    _id,
    name,
    description,
    duration,
    coursesIds = [],
    projectsIds = [],
    practicesIds = [],
    participants = 0,
    topic,
    order,
    rating,
  } = roadmap;

  const {
    currentRoadmapsIds = [],
    completedRoadmapsIds = [],
    completedCoursesIds = [],
    completedProjectsIds = [],
    completedPracticesIds = [],
    xp = 0,
  } = userProgress || {};

  const isCurrent = currentRoadmapsIds.includes(_id);
  const isCompleted = completedRoadmapsIds.includes(_id);

  const handleContinue = () => {
    const topic = order[0].topic;
    navigate(
      `/courses/${topic.toLowerCase().replace(/\s+/g, '-')}/${_id}/?ex=1`,
    );
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
        {isCompleted ? (
          <ViewAccomplishment onClick={handleViewDetails}>
            <span
              style={{
                fontSize: '1.8rem',
                color: 'var(--color-light-green-500)',
              }}
            >
              <FaCheckCircle />
            </span>
            View accomplishment
          </ViewAccomplishment>
        ) : (
          <>
            {isCurrent ? (
              <>
                <Progress percentage={50} />
                <Continue onClick={handleContinue}>Continue</Continue>
              </>
            ) : (
              <>
                <Count>
                  {coursesIds.length + projectsIds.length} Courses and Projects
                </Count>
                <Button onClick={handleViewDetails}>View Details</Button>
              </>
            )}
          </>
        )}
      </Details>
    </Card>
  );
}

export default RoadmapCard;
