import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Progress from '../../ui/Progress';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--color-grey-50);
  color: var(--color-mutedblue-900);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.12);
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
  padding-top: 1rem;
  font-size: 1.5rem;
  color: var(--color-grey-600);
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-grey-300);
  z-index: 1;
`;

const Count = styled.div`
  color: var(--color-grey-600);
  font-size: 1.5rem;
`;

const Continue = styled.button`
  width: 110px;
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-mutedblue-900);
  background-color: var(--color-light-green-500);
  border: none;

  &:hover {
    background-color: var(--color-light-green-600);
  }
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
  border: 2px solid var(--color-grey-500);

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function RoadmapCard({ userProgress, roadmap }) {
  const navigate = useNavigate();

  const { _id, description, coursesIds = [], topic, order = [] } = roadmap;
  const { currentRoadmapsIds = [], completedCoursesIds = [] } =
    userProgress || {};

  const isCurrent = currentRoadmapsIds.some(
    (entry) => entry.itemId?.toString().trim() === _id?.toString().trim(),
  );

  const progress =
    currentRoadmapsIds.find(
      (entry) => entry.itemId?.toString().trim() === _id?.toString().trim(),
    )?.progress || 0;

  const handleContinue = (e) => {
    e.stopPropagation();

    const findCourseInNestedStructure = (courses, courseId) => {
      for (const course of courses) {
        if (course._id === courseId) return course;

        if (course.subCourses && course.subCourses.length > 0) {
          const foundInSub = findCourseInNestedStructure(
            course.subCourses,
            courseId,
          );
          if (foundInSub) return foundInSub;
        }
      }
      return null;
    };

    if (completedCoursesIds.length > 0) {
      const lastCompletedCourseId =
        completedCoursesIds[completedCoursesIds.length - 1];
      const lastCompletedCourse = findCourseInNestedStructure(
        order,
        lastCompletedCourseId,
      );

      if (lastCompletedCourse) {
        const courseTitle = lastCompletedCourse.name
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        navigate(
          `/courses/${topic.toLowerCase().replace(/\s+/g, '-')}/${_id}/${courseTitle}/${lastCompletedCourse._id}`,
        );
        return;
      }
    }

    if (order.length > 0) {
      const firstCourse = order[0];
      const courseTitle = firstCourse.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      navigate(
        `/courses/${topic.toLowerCase().replace(/\s+/g, '-')}/${_id}/${courseTitle}/${firstCourse._id}`,
      );
    } else {
      navigate(`/roadmap/${_id}`);
    }
  };

  const handleViewDetails = () => {
    navigate(`/roadmap/${_id}`);
  };

  return (
    <Card onClick={handleViewDetails}>
      <Type>ROADMAP</Type>
      <Topic>{topic || 'Roadmap Topic'}</Topic>
      <Description>{description || 'No description available.'}</Description>

      <Details>
        {isCurrent ? (
          <>
            <Progress percentage={progress} />
            <Continue onClick={handleContinue}>Continue</Continue>
          </>
        ) : (
          <>
            <Count>{coursesIds.length} Courses</Count>
            <Button onClick={handleViewDetails}>View Details</Button>
          </>
        )}
      </Details>
    </Card>
  );
}

export default RoadmapCard;
