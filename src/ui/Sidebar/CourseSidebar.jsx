import styled from 'styled-components';

import { capitalizeWords } from '../../utils/helpers';
import { IoClose, IoMenu } from 'react-icons/io5';

import CourseProgressCircle from './CourseProgressCircle';
import SubCourses from './SubCourses';

const StyledSidebar = styled.aside`
  position: fixed;
  top: var(--header-height);
  left: 0;
  height: 100vh;
  width: ${(props) => (props.isOpen ? '14%' : '0')};
  padding: ${(props) => (props.isOpen ? '8px 0' : '0')};
  background-color: #fff !important;
  border-right: 1px solid var(--color-grey-50);
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  /* ✅ Hide Scrollbar */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer & Edge */

  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-900);
  flex-grow: 1;
`;

const CloseButton = styled.button`
  font-size: 1.6rem;
  color: var(--color-grey-900);
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const OpenButton = styled.div`
  position: fixed;
  top: 10rem;
  left: 0;
  background: var(--color-grey-100);
  border: 2px solid var(--color-grey-400);
  border-radius: 0 8px 8px 0;
  padding: 0.8rem;
  cursor: pointer;
  z-index: 1001;
  display: ${(props) => (props.isOpen ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-grey-200);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

function CourseSidebar({ isOpen, toggleSidebar, course, userProgress }) {
  const { completedCoursesIds = [] } = userProgress || {};
  const { subCourses = [] } = course || {};

  return (
    <>
      <StyledSidebar isOpen={isOpen}>
        <Header>
          <CourseProgressCircle
            courseId={course._id}
            coursesIds={subCourses}
            completedCoursesIds={completedCoursesIds}
            userProgress={userProgress}
          />
          <Title>{capitalizeWords(course.name)}</Title>
          <CloseButton onClick={toggleSidebar}>
            <IoClose size="2rem" />
          </CloseButton>
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
      </StyledSidebar>

      {/* Open Button when Sidebar is closed */}
      <OpenButton isOpen={isOpen} onClick={toggleSidebar}>
        <IoMenu size="2rem" />
      </OpenButton>
    </>
  );
}

export default CourseSidebar;
