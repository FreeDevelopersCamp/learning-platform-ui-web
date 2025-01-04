import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import MainNav from './MainNav';
import Spinner from '@/ui/Spinner.jsx';

const StyledSidebar = styled.aside`
  width: ${(props) => (props.isOpen ? '12.5%' : '0px')};
  background-color: var(--color-mutedblue-900);
  padding: ${(props) => (props.isOpen ? '8px 8px 0 0' : '0px')};
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  align-items: start;

  &:hover,
  &:active,
  &.active {
    transition: all 0.3s;
  }
`;

function Sidebar({ isOpen, role, onMenuSelect }) {
  const location = useLocation(); // Get the current path directly in Sidebar

  if (!role) return <Spinner />;

  return (
    <StyledSidebar isOpen={isOpen}>
      <MainNav
        isOpen={isOpen}
        currentPath={location.pathname} // Pass the current path to MainNav
        role={role}
        onMenuSelect={onMenuSelect}
      />
    </StyledSidebar>
  );
}

export default Sidebar;
