import { useEffect, useState } from 'react';
import styled from 'styled-components';

import FetchCourseSubCourses from './FetchCourseSubCourses';
import { useUpdateProgress } from '../../hooks/learner/useProgress';

const ProgressContainer = styled.div`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background: conic-gradient(
    var(--color-yellow-green-800) ${(props) => props.progress || 0}%,
    var(--color-grey-300) ${(props) => props.progress || 0}% 100%
  );
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
`;

const ProgressText = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-grey-900);
  font-size: 1.1rem;
  font-weight: bold;
`;

function ProgressCircle({
  courseId,
  coursesIds,
  completedCoursesIds,
  setPersentage,
  userProgress,
}) {
  const [progress, setProgress] = useState(0);
  const [allSubCourses, setAllSubCourses] = useState([]);
  const { mutate: updateProgress } = useUpdateProgress();

  useEffect(() => {
    const calculateProgress = () => {
      const allSubCourseIds = allSubCourses.map((subCourse) => subCourse._id);
      const completedCount = allSubCourseIds.filter((id) =>
        completedCoursesIds.includes(id),
      ).length;

      const totalCount = allSubCourseIds.length;
      const percentage = totalCount
        ? Math.round((completedCount / totalCount) * 100)
        : 0;

      setProgress(percentage);

      if (courseId && userProgress) {
        const updatedProgress = {
          ...userProgress,
          currentCoursesIds: userProgress.currentCoursesIds.map((course) =>
            course.itemId === courseId
              ? { ...course.itemId, progress: percentage }
              : course.itemId,
          ),
        };
        updateProgress(updatedProgress);
      }
    };

    calculateProgress();
  }, [
    allSubCourses,
    completedCoursesIds,
    courseId,
    userProgress,
    updateProgress,
  ]);

  return (
    <>
      <div style={{ width: '0', height: '0' }}>
        {coursesIds.map((course) => (
          <FetchCourseSubCourses
            key={course._id}
            course={course}
            setAllSubCourses={setAllSubCourses}
          />
        ))}
      </div>
      <ProgressContainer progress={progress}>
        <ProgressText>{progress}%</ProgressText>
      </ProgressContainer>
    </>
  );
}

export default ProgressCircle;
