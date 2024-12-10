import styled from 'styled-components';

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
  padding: 0 30px;
  gap: 15px;
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  height: 225px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Topic = styled.div`
  color: var(--color-grey-0);
  font-size: 2.5rem;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 3px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  border: none;
  color: #000820;
  background-color: #ffffff;

  &:hover {
    background-color: #ffffffd1;
  }

  &:focus {
    background-color: #ffffffd1;
    outline-offset: 2px;
  }
`;

const Stats = styled.div`
  display: flex;

  color: var(--color-grey-200);
  font-size: 1.5rem;
  gap: 30px;
  padding: 1.5rem 0 0;
`;

const Span = styled.span`
  display: flex;
  gap: 7px;
`;

function DetailsHeading({ roadmap, type }) {
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

  // course: name, duration, chapters, exercise, participants , xp

  const handleUpdateRoadmap = () => {
    // navigate(/roadmap/${roadmapId});
  };

  return (
    <Container>
      <Topic>{name || 'Roadmap Title'}</Topic>
      <Button onClick={() => handleUpdateRoadmap()}>Update Roadmap</Button>
      <Stats>
        <Span>
          <FaFreeCodeCamp style={{ fontSize: '2.2rem' }} />
          <span>{topic || ''}</span>
        </Span>
        <Span>
          <LuClock3 style={{ fontSize: '1.8rem' }} />
          <span>{duration || 90}</span> hours
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
