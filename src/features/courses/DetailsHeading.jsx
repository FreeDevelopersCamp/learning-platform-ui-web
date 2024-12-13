import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FaFreeCodeCamp } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import { GoDotFill } from 'react-icons/go';

import { FaRegBookmark } from 'react-icons/fa6';

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
  font-size: 2.5rem;
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
  gap: 5px;
  padding: 10px;
  margin-top: 3px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 1.5rem;
  border: none;
  color: #000820;
  background-color: var(--color-grey-100);

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:focus {
    background-color: var(--color-grey-200);
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
  background-color: var(--color-mutedblue-700);
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

function DetailsHeading({ course }) {
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

  const handleUpdateRoadmap = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const renderLevelIcons = (level) => {
    const levelIcons = {
      0: [
        <GoDotFill
          key={1}
          style={{ fontSize: '1.3rem', marginTop: '6px', color: '#03ef62' }}
        />,
      ],
      1: [
        <GoDotFill
          key={1}
          style={{ fontSize: '1.3rem', marginTop: '6px', color: '#03ef62' }}
        />,
        <GoDotFill
          key={2}
          style={{ fontSize: '1.3rem', marginTop: '6px', color: '#03ef62' }}
        />,
      ],
      2: [
        <GoDotFill
          key={1}
          style={{ fontSize: '1.3rem', marginTop: '6px', color: '#03ef62' }}
        />,
        <GoDotFill
          key={2}
          style={{ fontSize: '1.3rem', marginTop: '6px', color: '#03ef62' }}
        />,
        <GoDotFill
          key={3}
          style={{ fontSize: '1.3rem', marginTop: '6px', color: '#03ef62' }}
        />,
      ],
    };

    return levelIcons[level] || levelIcons['0'];
  };

  return (
    <Container>
      {/* <p>Interactive Course</p> */}
      <Topic>{name}</Topic>
      <Buttons>
        <Button onClick={() => handleUpdateRoadmap(course.id)}>
          Update Course
        </Button>
        <Button>
          <FaRegBookmark />
          Bookmark
        </Button>
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
          <span>{duration || 90}</span> hours
        </Span>
        <Span>
          {'< >'}
          <span>{subCoursesIds.length}</span> exercises
        </Span>
        <XP>
          <span>{xp}</span> XP
        </XP>
      </Stats>
      {/* for learner */}
      {/* <ProgressBar /> */}
    </Container>
  );
}

export default DetailsHeading;
