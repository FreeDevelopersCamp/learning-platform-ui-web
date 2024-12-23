import { useEffect } from 'react';
import { useFetchCourseById } from '../../hooks/courses/useCourse';
import Spinner from '../../ui/Spinner';

function RecursiveCourses({ courseId, setCourseStructure }) {
  const { data: course, isLoading: isCourseLoading } =
    useFetchCourseById(courseId);

  useEffect(() => {
    if (course) {
      const buildStructure = (courseData) => {
        const subCourses = (courseData.subCourses || []).map((subCourse) =>
          buildStructure(subCourse),
        );
        return { name: courseData.name, course: courseData, subCourses };
      };
      const courseStructure = buildStructure(course);
      setCourseStructure((prev) => [...prev, courseStructure]);
    }
  }, [course, setCourseStructure]);

  if (isCourseLoading || !course) return <Spinner />;

  return null;
}

export default RecursiveCourses;
