import { useState } from 'react';
import styled from 'styled-components';

import Chapter from './Chapter';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2rem 3rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:focus {
    box-shadow: 0px 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;
`;

const IconContainer = styled.div`
  padding-left: 0.5rem;
  transform: translateY(-0.6rem);
`;

const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 50%;
  color: white;
  background-color: #001b38;
`;

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-top: 1.8rem;
  color: var(--color-grey-700);
`;

const Button = styled.button`
  display: flex;
  color: #3131ff;
  padding: 2rem 0 4px;
  background: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Start = styled.button`
  display: flex;
  color: var(--color-mutedblue-800);
  background-color: var(--color-light-green-500);
  padding: 0.6rem 1.8rem;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-light-green-600);
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const Details = styled.div`
  padding-top: 0.5rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

function OrderCard({ index, parentCourse, course, title, role, userProgress }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { _id: courseId, name, description, subCourses = [] } = course;

  // Determine course status
  const isCompleted =
    userProgress?.completedCoursesIds &&
    userProgress.completedCoursesIds.includes(courseId);

  const isCurrent =
    userProgress?.currentCoursesIds &&
    userProgress.currentCoursesIds.includes(courseId);

  const toggleCard = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleViewCourse = () => {
    const formattedName = parentCourse.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/course/${formattedName}/${parentCourse._id}`);
  };

  const handleStartClick = (e) => {
    e.stopPropagation();
    const formattedName = parentCourse.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/course/${formattedName}/${parentCourse._id}`);
  };

  const renderButton = () => {
    if (isCompleted) {
      return <Start disabled>Completed</Start>;
    } else if (isCurrent) {
      return <Start onClick={handleStartClick}>Continue</Start>;
    } else {
      return <Start onClick={handleStartClick}>Start</Start>;
    }
  };

  return (
    <Card onClick={handleViewCourse}>
      <Container>
        <Order>{index}</Order>
        <Title>{name}</Title>
      </Container>
      <Description>{description}</Description>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '25px',
          borderTop: '1px solid #ddd',
          paddingTop: '20px',
          color: 'var(--color-grey-500)',
        }}
      >
        <Button onClick={toggleCard}>
          View Chapter Details
          <IconContainer>
            {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </IconContainer>
        </Button>

        {role === '6' && renderButton()}
      </div>

      {isOpen && (
        <Details>
          {subCourses.map((subCourse, subIndex) => (
            <Chapter
              key={subIndex}
              index={subIndex + 1}
              parentCourse={parentCourse}
              course={subCourse}
              title={title}
              role={role}
            />
          ))}
        </Details>
      )}
    </Card>
  );
}

export default OrderCard;
