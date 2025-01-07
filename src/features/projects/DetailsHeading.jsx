import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUpdateProgress } from '../../hooks/learner/useProgress';
import { formatDuration } from '../../utils/helpers.js';
import { LuClock3 } from 'react-icons/lu';
import { FaRegBookmark } from 'react-icons/fa6';
import { HiOutlineUsers } from 'react-icons/hi2';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--color-mutedblue-900);
  color: var(--color-grey-0);
  padding: 20px 30px;
  gap: 15px;
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Topic = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  color: var(--color-grey-100);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 7px 14px;
  margin-top: 3px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 1.5rem;
  gap: 0.5rem;
  color: var(--color-mutedblue-900);
  background-color: var(--color-light-green-500);

  &:hover {
    background-color: var(--color-light-green-600);
  }

  &:disabled {
    background-color: var(--color-light-green-700);
    color: var(--color-mutedblue-300);
  }
`;

const Bookmark = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin-top: 3px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 1.5rem;
  gap: 0.5rem;
  color: var(--color-grey-100);
  border: 1px solid var(--color-grey-100);

  &:hover {
    background-color: var(--color-grey-600);
  }

  &:focus {
    background-color: var(--color-grey-600);
    outline-offset: 2px;
  }
`;

const Stats = styled.div`
  display: flex;
  color: var(--color-grey-200);
  font-size: 1.4rem;
  gap: 20px;
  padding-top: 15px;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 4px;
  background-color: var(--color-mutedblue-800);
  border-radius: 4px;
`;

const XP = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 7px;
  padding: 2px 4px 1px;
  border-radius: 4px;
  background-color: #fcce0d;
  color: var(--color-mutedblue-900);
`;

function DetailsHeading({ project, userProgress, role }) {
  const navigate = useNavigate();
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  const {
    name,
    xp,
    duration,
    participants = 0,
    prerequisites = [],
    status,
  } = project || {};

  const isCompleted =
    userProgress?.completedProjectsIds &&
    userProgress.completedProjectsIds.includes(project?._id);

  const isCurrent =
    userProgress?.currentProjectsIds &&
    userProgress.currentProjectsIds.includes(project?._id);

  const handleStartClick = () => {
    navigate(`/project/${project._id}`);
  };

  const handleBookmark = () => {
    if (!userProgress) return;

    updateProgress({
      ...userProgress,
      BookmarksIds: [
        ...userProgress.BookmarksIds,
        { itemId: project._id, type: 'project' },
      ],
    });
  };

  return (
    <Container>
      <Topic>{name}</Topic>
      <Buttons>
        {role === '5' ? (
          <Button onClick={handleStartClick}>Update Project</Button>
        ) : isCompleted ? (
          <Button disabled>Completed</Button>
        ) : isCurrent ? (
          <Button onClick={handleStartClick}>Continue</Button>
        ) : (
          <Button onClick={handleStartClick}>Start</Button>
        )}

        {role === '6' && (
          <Bookmark onClick={handleBookmark}>
            <FaRegBookmark style={{ fontSize: '1.6rem', color: '#fcce0d' }} />
            Bookmark
          </Bookmark>
        )}
      </Buttons>
      <Stats>
        <Span>
          <LuClock3 style={{ fontSize: '1.6rem', marginTop: '0px' }} />
          <span>{duration && formatDuration(duration)}</span>
        </Span>
        <Span>
          <span>Participants:</span>
          <span>{participants}</span>
        </Span>
        <Span>
          Prerequisites:
          <span>
            {prerequisites.length > 0 ? prerequisites.join(', ') : 'None'}
          </span>
        </Span>
        <XP>
          <span>{xp}</span> XP
        </XP>
      </Stats>
    </Container>
  );
}

export default DetailsHeading;
