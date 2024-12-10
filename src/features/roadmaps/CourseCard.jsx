import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { convertDurationMinutesToHours } from '../../utils/helpers';
import { useCourse } from '../../hooks/courses/useCourse';

const Card = styled.div`
  width: 300px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  padding: 30px 20px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Instructor = styled.div`
  display: flex;
  margin-top: 25px;
`;

const InstructorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 2px solid #eaeaea;
`;

const InstructorName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  align-self: center;
`;

const Header = styled.div`
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Subtitle = styled.h4`
  font-size: 11px;
  color: #6c757d;
`;

const Topic = styled.h4`
  margin-top: 5px;
  font-size: 14px;
  color: #6c757d;
`;

const Description = styled.p`
  margin-top: 5px;
  font-family: 'Gill Sans', sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding-top: 16px;
  border-top: 1px solid #eaeaea;
`;

const Duration = styled.span`
  font-size: 12px;
  color: #6c757d;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: #001b38;
  background-color: #f9f9f9;
  border: 2px solid #003366;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function CourseCard({ courseId }) {
  const navigate = useNavigate();
  const { course, courseLoading, courseError } = useCourse(courseId);

  const [localCourse, setLocalCourse] = useState(null);

  useEffect(() => {
    if (course) {
      setLocalCourse(course);
    }
  }, [course]);

  if (courseLoading || !localCourse || courseError) return;

  const {
    name,
    description,
    duration,
    instructor: { coursesIds = [], projectsIds = [], practicesIds = [], user },
    topic,
  } = course;

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <Card onClick={() => handleViewDetails(courseId)}>
      <Content>
        <Header>
          <Subtitle style={{ textTransform: 'uppercase' }}>course</Subtitle>
          <Title>{name}</Title>
          <Topic>{topic}</Topic>
        </Header>
        <Description>{description}</Description>
      </Content>
      <Instructor>
        {user?.image ? (
          <InstructorImage
            src={user.image}
            alt={`${user.userName}'s profile`}
          />
        ) : (
          <InstructorImage
            src="https://via.placeholder.com/40"
            alt="Default profile"
          />
        )}
        <InstructorName>
          {user?.userName || 'Unknown Instructor'}
        </InstructorName>
      </Instructor>
      <Details>
        <Duration>{convertDurationMinutesToHours(duration)} </Duration>
        <Button>View Details</Button>
      </Details>
    </Card>
  );
}

export default CourseCard;
