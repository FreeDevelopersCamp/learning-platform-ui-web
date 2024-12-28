import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useFetchCourseById } from '../../hooks/courses/useCourse';

import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  padding: 1.5rem 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 3px;
  color: var(--color-grey-800);
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Title = styled.h3`
  font-size: 1.6rem;
  margin-left: 8px;
  cursor: pointer;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-800);
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
`;

const List = styled.ul`
  margin-top: 1rem;
  list-style: none;
  padding: 0;
`;

const SubCourseItem = styled.li`
  display: flex;
  padding: 0.5rem;
  color: var(--color-grey-900);
  border-radius: 3px;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const ProgressContainer = styled.div`
  height: 30px;
  width: 30px;
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
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-grey-900);
  font-size: 0.8rem;
  font-weight: bold;
`;

const Chapter = ({
  index,
  courseId,
  completedCoursesIds,
  roadmapId,
  topic,
}) => {
  const {
    data: course,
    isLoading: isCourseLoading,
    error,
  } = useFetchCourseById(courseId);

  const navigate = useNavigate();
  // const [isListOpen, setIsListOpen] = useState(() => {
  //   const savedState = localStorage.getItem(`chapter-${courseId}`);
  //   return savedState ? JSON.parse(savedState) : false;
  // });
  const [isListOpen, setIsListOpen] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isCourseLoading && course) {
      const totalSubCourses = course.subCourses?.length || 0;
      const completedSubCourses = course.subCourses?.filter((subCourse) =>
        completedCoursesIds.includes(subCourse._id),
      ).length;

      const calculatedProgress = totalSubCourses
        ? Math.round((completedSubCourses / totalSubCourses) * 100)
        : 0;

      setProgress(calculatedProgress);
    }
  }, [course, completedCoursesIds, isCourseLoading]);

  // Save the state to localStorage when toggled
  // useEffect(() => {
  //   localStorage.setItem(`chapter-${courseId}`, JSON.stringify(isListOpen));
  // }, [isListOpen, courseId]);

  if (isCourseLoading || !course || error) return null;

  const toggleList = () => {
    setIsListOpen((prev) => !prev);
  };

  const navigateToCourse = (id, name) => {
    const courseTitle = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    navigate(`/courses/${topic}/${roadmapId}/${courseTitle}/${id}`);
  };

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ProgressContainer progress={progress}>
          <ProgressText progress={progress}>
            {progress > 0 ? (
              `${progress}%`
            ) : (
              <span style={{ fontSize: '1.2rem' }}>{index}</span>
            )}
          </ProgressText>
        </ProgressContainer>
        <Title onClick={() => navigateToCourse(course._id, course.name)}>
          {course.name || 'Course Title'}
        </Title>
        <Button onClick={toggleList}>
          {isListOpen ? <IoChevronUp /> : <IoChevronDown />}
        </Button>
      </div>
      {isListOpen && (
        <List>
          {course.subCourses?.length > 0 ? (
            course.subCourses.map((subCourse, index1) => {
              const isSubCourseCompleted = completedCoursesIds.includes(
                subCourse._id,
              );
              return (
                <SubCourseItem
                  key={index1}
                  onClick={() =>
                    navigateToCourse(subCourse._id, subCourse.name)
                  }
                >
                  <span style={{ marginRight: '7px' }}>
                    {isSubCourseCompleted ? (
                      <FaCheck
                        style={{
                          color: 'var(--color-yellow-green-800)',
                          marginTop: '2px',
                        }}
                      />
                    ) : (
                      `${index}.${index1 + 1}`
                    )}
                  </span>
                  {subCourse.name}
                </SubCourseItem>
              );
            })
          ) : (
            <p>No subcourses available.</p>
          )}
        </List>
      )}
    </Container>
  );
};

export default Chapter;
