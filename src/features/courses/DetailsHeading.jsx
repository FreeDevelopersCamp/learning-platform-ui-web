import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatDuration } from '../../utils/helpers.js';

import { FaFreeCodeCamp } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import { GoDotFill } from 'react-icons/go';
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

const Level = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 7px;
  padding: 2px 0;
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

function DetailsHeading({ course, title, session, userProgress, role }) {
  const navigate = useNavigate();

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
    subCoursesIds = [],
    xp,
    created,
    updated,
    raters = [],
    rating,
    level,
  } = course;

  const {
    currentRoadmapsIds = [],
    completedRoadmapsIds = [],
    currentCoursesIds = [],
    completedCoursesIds = [],
    completedProjectsIds = [],
    completedPracticesIds = [],
    xpp,
  } = userProgress || {};

  const isCurrent = currentCoursesIds.includes(_id);
  const isCompleted = completedCoursesIds.includes(_id);

  const handleUpdateCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleContinueCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handlePracticeCourse = () => {
    navigate(
      `/course/${title.toLowerCase()}/${name.toLowerCase().replace(/\s+/g, '-')}/?ex=1`,
    );
  };

  const renderLevelIcons = (level) => {
    const levelIcons = {
      0: [
        <GoDotFill
          key={1}
          style={{
            fontSize: '1.3rem',
            marginTop: '4px',
            color: 'var(--color-light-green-500)',
          }}
        />,
      ],
      1: [
        <GoDotFill
          key={1}
          style={{
            fontSize: '1.3rem',
            marginTop: '4px',
            color: 'var(--color-light-green-500)',
          }}
        />,
        <GoDotFill
          key={2}
          style={{
            fontSize: '1.3rem',
            marginTop: '4px',
            color: 'var(--color-light-green-500)',
          }}
        />,
      ],
      2: [
        <GoDotFill
          key={1}
          style={{
            fontSize: '1.3rem',
            marginTop: '4px',
            color: 'var(--color-light-green-500)',
          }}
        />,
        <GoDotFill
          key={2}
          style={{
            fontSize: '1.3rem',
            marginTop: '4px',
            color: 'var(--color-light-green-500)',
          }}
        />,
        <GoDotFill
          key={3}
          style={{
            fontSize: '1.3rem',
            marginTop: '4px',
            color: 'var(--color-light-green-500)',
          }}
        />,
      ],
    };

    return levelIcons[level] || levelIcons['0'];
  };

  return (
    <Container>
      <Topic>{name}</Topic>
      <Buttons>
        {session.role === '5' ? (
          <Button onClick={() => handleUpdateCourse(_id)}>Update Course</Button>
        ) : isCurrent ? (
          <Button onClick={() => handleContinueCourse(_id)}>Continue</Button>
        ) : (
          <Button onClick={() => handlePracticeCourse()}>Practice Now</Button>
        )}
        <Bookmark>
          <FaRegBookmark style={{ fontSize: '1.6rem', color: '#fcce0d' }} />
          Bookmark
        </Bookmark>
      </Buttons>
      <Stats>
        <Level>
          <div style={{ display: 'flex' }}>{renderLevelIcons(level)}</div>
          <span>
            {level === '0'
              ? 'Beginner'
              : level === '1'
                ? 'Intermediate'
                : 'Advanced'}
          </span>
        </Level>
        <Span>
          <LuClock3 style={{ fontSize: '1.6rem', marginTop: '0px' }} />
          <span>{formatDuration(duration)}</span>
        </Span>
        <Span>
          {'< >'}
          <span>{subCoursesIds.length}</span> Exercises
        </Span>
        <Span>
          <HiOutlineUsers style={{ fontSize: '1.8rem', marginTop: '0px' }} />
          <span>123 Participants</span>
        </Span>
        <XP>
          <span>{xp}</span> XP
        </XP>
      </Stats>
    </Container>
  );
}

export default DetailsHeading;
