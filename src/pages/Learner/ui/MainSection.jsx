import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFetchRoadmapById } from '../../../hooks/roadmaps/useRoadmap';

import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

import Progress from './Progress';
import Review from './Review';

import { formatDuration } from '../../../utils/helpers';
import Spinner from '../../../ui/Spinner';

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-theme-100);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TrackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;

  a {
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
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
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
`;

function MainSection({ userProgress }) {
  const navigate = useNavigate();
  const roadmapId = userProgress?.currentRoadmapsIds[0]?.itemId;
  const progress = userProgress?.currentRoadmapsIds[0]?.progress;

  const { data: roadmap, isLoading: isLoadingRoadmap } =
    useFetchRoadmapById(roadmapId);

  if (isLoadingRoadmap) return <Spinner />;
  if (!roadmap) return <div>No roadmap found.</div>;

  const currentCourse = roadmap.order.find(
    (course) => !userProgress.completedCoursesIds.includes(course._id),
  );

  const totalTimeLeft = roadmap.order.reduce((acc, course) => {
    if (!userProgress.completedCoursesIds.includes(course._id)) {
      return acc + (course.duration || 0);
    }
    return acc;
  }, 0);

  const handleContinue = () => {
    if (!roadmap || !userProgress?.completedCoursesIds) {
      console.error('Roadmap or user progress data is missing.');
      return;
    }

    // Recursive function to find the course in nested structures
    const findCourseInNestedStructure = (courses, courseId) => {
      for (const course of courses) {
        if (course._id === courseId) return course; // Found the course

        // Check in subCourses if they exist
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

    if (userProgress.completedCoursesIds.length > 0) {
      // Get the last completed course ID
      const lastCompletedCourseId =
        userProgress.completedCoursesIds[
          userProgress.completedCoursesIds.length - 1
        ];

      // Use the recursive function to find the course
      const lastCompletedCourse = findCourseInNestedStructure(
        roadmap.order,
        lastCompletedCourseId,
      );

      if (lastCompletedCourse) {
        const courseTitle = lastCompletedCourse.name
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        // Navigate to the last completed course
        navigate(
          `/courses/${roadmap.topic.toLowerCase().replace(/\s+/g, '-')}/${roadmapId}/${courseTitle}/${lastCompletedCourse._id}`,
        );
        return;
      }
    }

    // Fallback: Navigate to the first course if no completed course is found
    const nextCourse = roadmap.order.find(
      (course) => !userProgress.completedCoursesIds.includes(course._id),
    );

    if (nextCourse) {
      const courseTitle = nextCourse.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      navigate(
        `/courses/${roadmap.topic.toLowerCase().replace(/\s+/g, '-')}/${roadmapId}/${courseTitle}/${nextCourse._id}`,
      );
    } else {
      // Navigate to roadmap overview if all courses are completed
      navigate(`/roadmap/${roadmapId}`);
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
            <Progress progress={progress} width="50%" />
            <div className="flex flex-row items-center gap-2">
              <QueryBuilderIcon />
              {/* {`${formatDuration(currentCourse.duration)} to go`} */}
              {`${formatDuration(totalTimeLeft)} to go`}
            </div>
          </ProgressSection>
        </div>
        <div>
          <StyledButton onClick={() => handleContinue()}>
            {currentCourse ? 'Keep Making Progress' : 'View Certificate'}
          </StyledButton>
        </div>
      </TrackInfo>

      <Review />
    </StyledMainSection>
  );
}

export default MainSection;
