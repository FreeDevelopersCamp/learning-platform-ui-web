import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  padding: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-800);
  cursor: pointer;
  font-size: 1.5rem;
`;

const List = styled.ul`
  margin: 1rem 0 0 0.8rem;
  list-style: none;
  padding: 0;
  font-size: 1.2rem;
  color: var(--color-grey-900);
`;

const ListItem = styled.li`
  font-size: 1.3rem;
  padding: 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function SubCourses({
  parentCourse,
  subCourse,
  completedCoursesIds,
  index = 0,
  role = '',
}) {
  const navigate = useNavigate();
  const { _id: courseId, name, subCourses = [] } = subCourse;
  const isCompleted = completedCoursesIds.includes(courseId);

  const [isListOpen, setIsListOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleList = () => setIsListOpen((prev) => !prev);

  const handleViewCourse = (courseId, courseName) => {
    if (parentCourse) {
      const formattedName = courseName.toLowerCase().replace(/\s+/g, '-');
      const parentFormattedName = parentCourse.name
        .toLowerCase()
        .replace(/\s+/g, '-');
      navigate(
        `/course/${parentFormattedName}/${parentCourse._id}/${formattedName}/${courseId}`,
      );
    }
  };

  const calculateProgress = (courses, completedIds) => {
    let total = 0;
    let completed = 0;

    const calculateRecursive = (courses) => {
      courses.forEach((course) => {
        total += 1;
        if (completedIds.includes(course._id)) {
          completed += 1;
        }
        if (course.subCourses?.length > 0) {
          calculateRecursive(course.subCourses);
        }
      });
    };

    calculateRecursive(courses);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  useEffect(() => {
    // Use the recursive progress calculation
    const calculatedProgress = calculateProgress(
      [subCourse],
      completedCoursesIds,
    );
    setProgress(calculatedProgress);
  }, [subCourses, completedCoursesIds, isCompleted]);

  return (
    <Card>
      <Container>
        <Header>
          <div>
            <ProgressContainer progress={progress}>
              <ProgressText>
                {progress > 0 ? (
                  `${progress}%`
                ) : (
                  <span style={{ fontSize: '1.2rem', marginTop: '.2px' }}>
                    {index}
                  </span>
                )}
              </ProgressText>
            </ProgressContainer>
          </div>
          <Title onClick={() => handleViewCourse(courseId, name)}>{name}</Title>
        </Header>
        <Button onClick={toggleList}>
          {isListOpen ? <IoChevronUp /> : <IoChevronDown />}
        </Button>
      </Container>
      {isListOpen && (
        <List>
          {subCourses.length > 0 ? (
            subCourses.map((sub, subIndex) => (
              <ListItem
                key={sub._id}
                onClick={() => handleViewCourse(sub._id, sub.name)}
              >
                {completedCoursesIds.includes(sub._id) ? (
                  <span
                    style={{
                      marginRight: '8px',
                      fontWeight: 'bold',
                      color: 'green',
                    }}
                  >
                    ✔
                  </span>
                ) : (
                  <span
                    style={{ marginRight: '8px', fontWeight: 'bold' }}
                  >{`${index}.${subIndex + 1}`}</span>
                )}
                {sub.name}
              </ListItem>
            ))
          ) : (
            <ListItem>No subcourses available</ListItem>
          )}
        </List>
      )}
    </Card>
  );
}

export default SubCourses;
