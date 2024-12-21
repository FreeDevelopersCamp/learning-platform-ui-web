import { useFetchCourseById } from '../../hooks/courses/useCourse';

import RecursiveCourseRenderer from './RecursiveCourseRenderer';
import Spinner from '../../ui/Spinner';

function ViewCourses({ orderView, courseStructure }) {
  const { id: courseId } = orderView;

  const {
    data: course,
    isLoading: isCourseLoading,
    error,
  } = useFetchCourseById(courseId);

  if (isCourseLoading || !course || error) return <Spinner />;

  console.log('courseStructure: ', courseStructure);
  return <div>zzzzzzzzzzzzzzz</div>;
}

export default ViewCourses;
