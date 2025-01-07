import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Chapter from '../../features/roadmaps/Chapter';
import ProgressCircle from './ProgressCircle';

import { capitalizeWords } from '../../utils/helpers';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

const StyledSidebar = styled.aside`
  position: fixed;
  top: 6.3%;
  left: 0;
  height: 100vh;
  width: ${(props) => (props.isOpen ? '14%' : '0px')};
  color: white;
  padding: ${(props) => (props.isOpen ? '8px 0' : '0px')};
  transition: all 0.3s ease-in-out;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-50);
  z-index: 1000;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 3px;
  gap: 3rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-900);
  text-align: left;
  text-decoration: underline;
`;

const Button = styled.button`
  padding: 0;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-grey-900);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
  color: white;
`;

function CoursesSidebar({
  isOpen,
  toggleSidebar,
  roadmap,
  userProgress,
  setPersentage,
  isActive = true,
}) {
  const { title } = useParams();
  const { coursesIds = [], projectsIds = [] } = roadmap;
  const { completedCoursesIds = [] } = userProgress || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [project, setProject] = useState();

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const nextItemIsProject = (order, currentId) => {
    if (currentIndex >= order.length) return;

    if (order[currentIndex]._id === currentId) {
      for (let i = 1; i + currentIndex < order.length; i++) {
        if (coursesIds.includes(order[currentIndex + i]._id)) break;

        if (projectsIds.includes(order[currentIndex + i]._id)) {
          setProject(order[currentIndex + i]);
          setCurrentIndex(currentIndex + i);
          return order[currentIndex + i];
        }
      }
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <StyledSidebar isOpen={isOpen}>
      {isOpen && (
        <>
          <Header>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
              }}
            >
              <ProgressCircle
                roadmapId={roadmap._id}
                coursesIds={coursesIds}
                completedCoursesIds={completedCoursesIds}
                setPersentage={setPersentage}
                userProgress={userProgress}
              />
              <Title>{capitalizeWords(title)}</Title>
            </div>
            <Button onClick={handleToggleSidebar}>
              <IoClose size="2rem" />
            </Button>
          </Header>
          <List>
            {roadmap.coursesIds.map((courseId, index) => {
              const nextProject = nextItemIsProject(roadmap.order, courseId);

              console.log('nextProject:', nextProject);
              return (
                <Chapter
                  key={index}
                  index={index + 1}
                  courseId={courseId}
                  completedCoursesIds={completedCoursesIds}
                  roadmapId={roadmap._id}
                  topic={roadmap.topic}
                  project={nextProject}
                  isActive={isActive}
                />
              );
            })}
          </List>
        </>
      )}
    </StyledSidebar>
  );
}

export default CoursesSidebar;
