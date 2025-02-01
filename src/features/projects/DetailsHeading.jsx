import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { LuClock3 } from 'react-icons/lu';
import { FaRegBookmark } from 'react-icons/fa6';

import { formatDurationCard } from '../../utils/helpers.js';

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
  background-color: ${(props) =>
    props.bgColor || 'var(--color-light-green-500)'};

  &:hover {
    background-color: ${(props) =>
      props.hoverBg || 'var(--color-light-green-600)'};
  }
`;

// ✅ Passed and Submitted Button Styles
const PassedButton = styled(Button)`
  background-color: #1b5e20; /* Dark Green */
  color: white;
  border-color: #1b5e20;

  &:hover {
    background-color: #144d17; /* Darker Green */
  }
`;

const SubmittedButton = styled(Button)`
  background-color: #4caf50; /* Light Green */
  color: white;
  border-color: #4caf50;

  &:hover {
    background-color: #45a049; /* Slightly Darker Green */
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

function DetailsHeading({ project, role, userProgress, updateProgress }) {
  const navigate = useNavigate();

  const {
    name,
    xp,
    duration,
    participants = 0,
    prerequisites = [],
  } = project || {};

  // ✅ Get project status from userProgress
  const currentProject = userProgress?.currentProjectsIds?.find(
    (p) => p.id === project?._id,
  );
  const projectStatus = currentProject?.status ?? null;

  const handleNavigate = (e) => {
    e.stopPropagation();
    navigate(
      `/project/${project.name.toLowerCase().replace(/\s+/g, '-')}/${project._id}`,
    );
  };

  const handleBookmark = () => {
    const newBookmark = {
      itemId: project._id,
      type: 'project',
    };

    const isAlreadyBookmarked = userProgress?.BookmarksIds?.some(
      (bookmark) => bookmark.itemId === project._id,
    );

    if (isAlreadyBookmarked) {
      toast.success('🚀 Project already bookmarked!');
      return;
    }

    const updatedProgress = {
      ...userProgress,
      userId: userProgress.user._id,
      BookmarksIds: [...userProgress.BookmarksIds, newBookmark],
    };

    updateProgress(updatedProgress);
  };

  return (
    <Container>
      <Topic>{name}</Topic>
      <Buttons>
        {role === '6' ? (
          <>
            {projectStatus === '2' ? (
              <PassedButton onClick={handleNavigate}>Passed</PassedButton>
            ) : projectStatus === '0' || projectStatus === '1' ? (
              <SubmittedButton onClick={handleNavigate}>
                Submitted
              </SubmittedButton>
            ) : (
              <Button
                onClick={handleNavigate}
                bgColor="#cce5ff"
                color="#0056b3"
                borderColor="#0056b3"
              >
                Start
              </Button>
            )}
          </>
        ) : (
          <Button onClick={handleNavigate}>Update Project</Button>
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
          <span>{formatDurationCard(duration || 20)}</span>
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
