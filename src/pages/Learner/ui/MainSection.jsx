import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

import Progress from './Progress';
import Review from './Review';

import { formatDuration } from '../../../utils/helpers';

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-theme-100);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const TrackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
`;

const StyledButton = styled.button`
  background-color: var(--color-light-green-500);
  color: var(--color-grey-900);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-light-green-600);
  }
`;

const CourseName = styled.h2`
  font-weight: 600;
  font-size: 2.4rem;
  text-decoration: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
`;

function MainSection({ roadmap, userProgress }) {
  const navigate = useNavigate();

  const { _id, topic, order = [] } = roadmap;
  const { completedCoursesIds = [] } = userProgress;

  // ✅ Find the next incomplete course efficiently
  const currentCourse = useMemo(
    () => order.find((course) => !completedCoursesIds.includes(course._id)),
    [order, completedCoursesIds],
  );

  // ✅ Calculate total time left efficiently
  const totalTimeLeft = useMemo(
    () =>
      order.reduce((acc, course) => {
        return !completedCoursesIds.includes(course._id)
          ? acc + (course.duration || 0)
          : acc;
      }, 0),
    [order, completedCoursesIds],
  );

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

  return (
    <StyledMainSection>
      <TrackInfo>
        <div className="flex flex-col">
          <div>
            You’re enrolled in the <strong>{roadmap.name}</strong> roadmap.
          </div>
          <CourseName>
            {currentCourse
              ? currentCourse.name
              : 'You have completed all courses!'}
          </CourseName>
          <ProgressSection>
            <Progress
              progress={userProgress.currentRoadmapsIds?.[0]?.progress || 0}
              width="50%"
            />
            <div className="flex flex-row items-center gap-2">
              <QueryBuilderIcon />
              {`${formatDuration(totalTimeLeft)} to go`}
            </div>
          </ProgressSection>
        </div>
        <div>
          <StyledButton onClick={handleContinue}>
            {currentCourse ? 'Keep Making Progress' : 'View Certificate'}
          </StyledButton>
        </div>
      </TrackInfo>

      <Review />
    </StyledMainSection>
  );
}

export default MainSection;
