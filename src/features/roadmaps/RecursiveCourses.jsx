import { useEffect } from 'react';
import { useFetchCourseById } from '../../hooks/courses/useCourse';
import Spinner from '../../ui/Spinner';

function RecursiveCourses({
  courseId,
  addToTempStructure,
  index,
  level = 1,
  parentEx = '',
}) {
  const { data: course, isLoading: isCourseLoading } =
    useFetchCourseById(courseId);

  useEffect(() => {
    if (course) {
      const buildStructure = (courseData, currentLevel, parentEx) => {
        const currentEx = parentEx
          ? `${parentEx}.${currentLevel}` // Subcourse ex
          : `${currentLevel}`; // Top-level ex

        const subCourses = (courseData.subCourses || []).map((subCourse, idx) =>
          buildStructure(subCourse, idx + 1, currentEx),
        );

        return {
          level: currentLevel,
          name: courseData.name,
          course: courseData,
          ex: currentEx,
          subCourses,
        };
      };

      const courseStructure = buildStructure(course, level, parentEx);

      addToTempStructure(courseStructure, index);
    }
  }, [course, index, level, parentEx, addToTempStructure]);

  if (isCourseLoading || !course) return <Spinner />;

  return null;
}

export default RecursiveCourses;
