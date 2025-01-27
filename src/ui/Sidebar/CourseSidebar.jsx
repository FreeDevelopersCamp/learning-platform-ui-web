import styled from 'styled-components';

import CourseProgressCircle from './CourseProgressCircle';
import SubCourses from './SubCourses';
import { capitalizeWords } from '../../utils/helpers';

import { IoClose, IoMenu } from 'react-icons/io5';

const StyledSidebar = styled.aside`
  position: fixed;
  top: var(--header-height);
  left: 0;
  height: 100vh;
  width: ${(props) => (props.isOpen ? '14%' : '0')};
  padding: ${(props) => (props.isOpen ? '8px 0' : '0')};
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-50);
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-900);
`;

const Button = styled.button`
  font-size: 1.4rem;
  font-weight: bold;
  margin-right: 20px;
  color: var(--color-grey-900);
  background: none;
  border: none;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

function CourseSidebar({
  isOpen,
  toggleSidebar,
  course,
  userProgress,
  setPersentage,
}) {
  const { completedCoursesIds = [] } = userProgress || {};
  const { subCourses = [] } = course || {};

  return (
    <StyledSidebar isOpen={isOpen}>
      {isOpen ? (
        <>
          <Header>
            <CourseProgressCircle
              courseId={course._id}
              coursesIds={subCourses}
              completedCoursesIds={completedCoursesIds}
              setPersentage={setPersentage}
              userProgress={userProgress}
            />
            <Title>{capitalizeWords(course.name)}</Title>
            <Button onClick={toggleSidebar}>
              <IoClose size="2rem" />
            </Button>
          </Header>

          <List>
            {subCourses.length > 0 ? (
              subCourses.map((subCourse, index) => (
                <SubCourses
                  key={subCourse._id}
                  index={index + 1}
                  parentCourse={course}
                  subCourse={subCourse}
                  completedCoursesIds={completedCoursesIds}
                  role={userProgress?.role || ''}
                />
              ))
            ) : (
              <p>No sub-courses available.</p>
            )}
          </List>
        </>
      ) : (
        <Button onClick={toggleSidebar} style={{ margin: '1rem' }}>
          <IoMenu size="2rem" />
        </Button>
      )}
    </StyledSidebar>
  );
}

export default CourseSidebar;
