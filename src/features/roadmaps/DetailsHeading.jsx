import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FaFreeCodeCamp } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import { FaBolt } from 'react-icons/fa';
import { PiTarget } from 'react-icons/pi';
import { CiViewList } from 'react-icons/ci';
import { RiTeamLine } from 'react-icons/ri';

const Container = styled.div`
  background-color: var(--color-mutedblue-900);
  color: var(--color-grey-100);
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 4px 6px var(--color-grey-50);
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px 30px ${(props) => (props.role === '6' ? '20px' : '30px')};
  gap: 10px;
  width: 100%;
  margin: 0 auto;
`;

const ProgressBarContainer = styled.div`
  width: calc(100%);
`;

const Topic = styled.div`
  color: var(--color-grey-100);
  font-size: 2.5rem;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px 15px;
  margin-top: 3px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  border: none;
  color: var(--color-mutedblue-900);
  background-color: var(--color-light-green-500);

  &:hover {
    background-color: var(--color-light-green-600);
  }

  &:focus {
    background-color: var(--color-light-green-600);
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

function DetailsHeading({
  roadmap,
  updateRoadmap,
  session,
  userProgress,
  updateProgress,
  role,
  children,
}) {
  const navigate = useNavigate();

  const {
    _id,
    name,
    description,
    duration,
    coursesIds = [],
    projectsIds = [],
    practicesIds = [],
    participants,
    topic,
    order,
  } = roadmap;

  const {
    currentRoadmapsIds = [],
    completedRoadmapsIds = [],
    completedCoursesIds = [],
    completedProjectsIds = [],
    completedPracticesIds = [],
    xp,
  } = userProgress || {};

  const isCurrent = currentRoadmapsIds.includes(roadmap._id);
  const isCompleted = completedRoadmapsIds.includes(roadmap._id);

  const handleUpdateRoadmap = (roadmapId) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  const handleContinueTrack = (roadmapId) => {
    const name = order[0].name;
    navigate(
      `/courses/${name.toLowerCase().replace(/\s+/g, '-')}/${roadmapId}/?ex=1`,
    );
  };

  const handleRegisterRoadmap = (roadmapId) => {
    const updatedProgress = {
      ...userProgress,
      currentRoadmapsIds: [...currentRoadmapsIds, roadmapId],
    };
    updateProgress(updatedProgress);

    const ubdatedData = {
      _id,
      participants: (roadmap.participants || 0) + 1,
    };
    updateRoadmap(ubdatedData);

    navigate(`/roadmap/${roadmapId}`);
  };

  return (
    <>
      <Container>
        <DetailsContainer role={role}>
          <Topic>{name}</Topic>
          {session.role === '5' ? (
            <Button onClick={() => handleUpdateRoadmap(roadmap._id)}>
              Update Roadmap
            </Button>
          ) : isCurrent ? (
            <Button onClick={() => handleContinueTrack(roadmap._id)}>
              Continue Track
            </Button>
          ) : (
            <Button onClick={() => handleRegisterRoadmap(roadmap._id)}>
              Start Track
            </Button>
          )}
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
        </DetailsContainer>
        {/* for learner */}
        <ProgressBarContainer>{children}</ProgressBarContainer>
      </Container>
    </>
  );
}

export default DetailsHeading;
