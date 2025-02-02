import styled from 'styled-components';
import { useEffect, useState } from 'react';
import FetchAllSubCourses from './FetchAllSubCourses';
import { useUpdateProgress } from '../../apis/learn/Progress/hooks/useProgress';

const ProgressContainer = styled.div`
  height: 42px;
  width: 50px;
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
  roadmapId,
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

      if (roadmapId && userProgress) {
        const updatedProgress = {
          ...userProgress,
          userId: userProgress.user._id,
          currentRoadmapsIds: userProgress.currentRoadmapsIds.map((roadmap) =>
            roadmap.itemId === roadmapId
              ? { ...roadmap, progress: percentage }
              : roadmap,
          ),
        };
        updateProgress(updatedProgress);
      }
    };

    calculateProgress();
  }, [
    allSubCourses,
    completedCoursesIds,
    roadmapId,
    userProgress,
    updateProgress,
  ]);

  return (
    <>
      <div style={{ width: '0', height: '0' }}>
        {coursesIds.map((courseId) => (
          <FetchAllSubCourses
            key={courseId}
            courseId={courseId}
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
