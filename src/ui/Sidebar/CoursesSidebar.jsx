import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Chapter from '../features/roadmaps/Chapter';
import { capitalizeWords } from '../utils/helpers';

import { IoClose } from 'react-icons/io5';

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
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide scrollbar in IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome, Safari, and Opera */
  }

  &:hover,
  &:active,
  &.active {
    transition: all 0.3s;
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

const ProgressCircle = styled.div`
  height: 40px;
  width: 40px;
  max-width: 20%;
  border-radius: 50%;
  background: conic-gradient(
    var(--color-yellow-green-800) ${(props) => props.progress || 0}%,
    var(--color-grey-300) ${(props) => props.progress || 0}% 100%
  );
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;

  &::before {
    content: '';
    width: 28px;
    height: 28px;
    background-color: var(--color-grey-100);
    border-radius: 50%;
    position: absolute;
    z-index: 1;
  }

  &::after {
    content: '${(props) => props.progress || 0}%';
    position: absolute;
    z-index: 2;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--color-grey-900);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translatey(1px);
  }
`;

const Title = styled.div`
  width: 30px;
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

function CoursesSidebar({ isOpen, toggleSidebar, roadmap, isActive = true }) {
  const { title } = useParams();

  const handleToggleSidebar = () => {
    toggleSidebar();
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
              <ProgressCircle progress={50} />
              <Title>{capitalizeWords(title)}</Title>
            </div>
            <Button onClick={handleToggleSidebar}>
              <IoClose size="2rem" />
            </Button>
          </Header>
          <List>
            {roadmap.coursesIds.map((courseId, index) => (
              <Chapter
                key={index}
                index={index + 1}
                courseId={courseId}
                isActive={isActive}
              />
            ))}
          </List>
        </>
      )}
    </StyledSidebar>
  );
}

export default CoursesSidebar;
