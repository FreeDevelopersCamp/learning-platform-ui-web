import { useFetchCourseById } from '../../hooks/courses/useCourse';
import Spinner from '../../ui/Spinner';

function RecursiveCourses({ order }) {
  const { data: course, isLoading: isCourseLoading } = useFetchCourseById(
    order.id,
  );

  if (isCourseLoading || !course) return <Spinner />;

  return null;
}

export default RecursiveCourses;
