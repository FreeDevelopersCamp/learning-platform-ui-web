import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRoadmap } from '../../hooks/roadmaps/useRoadmap';

import { FaFreeCodeCamp } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import { FaBolt } from 'react-icons/fa';
import { PiTarget } from 'react-icons/pi';
import { CiViewList } from 'react-icons/ci';
import { RiTeamLine } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #001b38;
  color: #ffffff;
  padding: 25px 35px 0;
  gap: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  height: 250px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Topic = styled.div`
  color: var(--color-grey-0);
  font-size: 2.5rem;
  font-weight: bold;
`;

const Button = styled.button`
  width: 135px;
  height: 40px;
  padding: 8px;
  margin-top: 3px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  border: none;
  color: #001b38;
  background-color: #03ef62;

  &:hover {
    background-color: #22bd60;
  }

  &:focus {
    outline: 2px solid #22bd60;
    outline-offset: 2px;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-100);
  line-height: 1.5;
  padding-top: 1rem;
`;

const Stats = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  color: var(--color-grey-200);
  font-size: 1.5rem;
  gap: 30px;
  padding: 1.5rem 0 0;
`;

const Span = styled.span`
  display: flex;
  gap: 7px;
`;

function DetailsHeading({ roadmapId }) {
  const navigate = useNavigate();
  const { roadmap, roadmapLoading, roadmapError } = useRoadmap(roadmapId);

  const [localRoadmap, setLocalRoadmap] = useState(null);

  useEffect(() => {
    if (roadmap) {
      setLocalRoadmap(roadmap);
    }
  }, [roadmap]);

  if (roadmapLoading || !localRoadmap || roadmapError) return;

  const {
    name,
    description,
    duration,
    coursesIds = [],
    projectsIds = [],
    practicesIds = [],
    participants = 0,
    topic,
  } = roadmap;

  const handleViewDetails = (roadmapId) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  return (
    <Container>
      <Topic>{name || 'Roadmap Title'}</Topic>
      <Button onClick={() => handleViewDetails(roadmapId)}>View Details</Button>

      <Description>{description || 'No description available.'}</Description>

      <Stats>
        <Span>
          <FaFreeCodeCamp style={{ fontSize: '2.2rem' }} />
          <span>{topic || ''}</span>
        </Span>
        <Span>
          <LuClock3 style={{ fontSize: '1.8rem' }} />
          <span>{duration || 0}</span> hours
        </Span>
        <Span>
          <FaBolt style={{ fontSize: '1.7rem' }} />
          <span>{coursesIds.length}</span> courses
        </Span>
        <Span>
          <PiTarget
            style={{
              fontSize: '1.8rem',
              transform: 'rotate(-45deg)',
            }}
          />
          <span>{0}</span> assessments
        </Span>
        <Span>
          <CiViewList style={{ fontSize: '1.8rem' }} />
          <span>{projectsIds.length}</span> projects
        </Span>
        <Span>
          <RiTeamLine style={{ fontSize: '1.8rem' }} />
          <span>{practicesIds.length}</span> practices
        </Span>
        <Span>
          <RiTeamLine style={{ fontSize: '1.8rem' }} />
          <span>{participants}</span> participants
        </Span>
      </Stats>

      {/* for learner */}
      {/* <ProgressBar /> */}
    </Container>
  );
}

export default DetailsHeading;
