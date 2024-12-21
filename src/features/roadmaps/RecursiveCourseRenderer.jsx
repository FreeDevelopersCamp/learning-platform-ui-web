function RecursiveCourseRenderer({ course, setCourseStructure }) {
  const { subCourses = [] } = course;

  return (
    <div>
      {subCourses.map((subCourse, index) => (
        <RecursiveCourseRenderer
          key={index}
          course={subCourse}
          setCourseStructure={setCourseStructure}
        />
      ))}
    </div>
  );
}

export default RecursiveCourseRenderer;
