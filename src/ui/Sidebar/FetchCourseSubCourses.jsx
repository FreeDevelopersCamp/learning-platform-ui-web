import { useEffect } from 'react';

function FetchCourseSubCourses({ course, setAllSubCourses }) {
  useEffect(() => {
    if (course) {
      setAllSubCourses((prev) => {
        // Create a set of existing course IDs to avoid duplicates
        const existingIds = new Set(prev.map((subCourse) => subCourse._id));
        const updatedCourses = [...prev];

        // Add the current course if it doesn't already exist
        if (!existingIds.has(course._id)) {
          updatedCourses.push(course);
        }

        // Process the first level of subcourses
        if (course.subCourses && course.subCourses.length > 0) {
          course.subCourses.forEach((subCourse) => {
            if (!existingIds.has(subCourse._id)) {
              updatedCourses.push(subCourse);
            }

            // Process the second level of subcourses (nested subcourses)
            if (subCourse.subCourses && subCourse.subCourses.length > 0) {
              subCourse.subCourses.forEach((subCourse2) => {
                if (!existingIds.has(subCourse2._id)) {
                  updatedCourses.push(subCourse2);
                }
              });
            }
          });
        }

        return updatedCourses;
      });
    }
  }, [course, setAllSubCourses]);

  return null;
}

export default FetchCourseSubCourses;
