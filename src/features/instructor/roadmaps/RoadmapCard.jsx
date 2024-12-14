import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRoadmap } from '../../../hooks/roadmaps/useRoadmap';

import Spinner from '../../../ui/Spinner';

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
  color: #001b38;
  padding-top: 1rem;
  font-size: 1.5rem;
  color: var(--color-grey-500);
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 0 auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-grey-300);
  z-index: 1;
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
  border: 2px solid var(--color-grey-800);

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function RoadmapCard({ roadmapId }) {
  const navigate = useNavigate();
  const { roadmap, roadmapLoading, roadmapError } = useRoadmap(roadmapId);

  const [localRoadmap, setLocalRoadmap] = useState(null);

  useEffect(() => {
    if (roadmap) {
      setLocalRoadmap(roadmap);
    }
  }, [roadmap]);

  if (roadmapLoading || !localRoadmap) return <Spinner />;

  const {
    name,
    description,
    duration,
    coursesIds = [],
    projectsIds = [],
    practicesIds = [],
    participants = 0,
    topic,
    rating,
  } = roadmap;

  const handleViewDetails = (roadmapId) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  return (
    <Card onClick={() => handleViewDetails(roadmapId)}>
      <Type>ROADMAP</Type>
      <Topic>{topic || 'Roadmap Topic'}</Topic>
      <Description>{description || 'No description available.'}</Description>
      <Details>
        <Button onClick={() => handleViewDetails}>View Details</Button>
      </Details>
    </Card>
  );
}

export default RoadmapCard;
