import styled from 'styled-components';
import MainNav from '../MainNav';

const StyledSidebar = styled.aside`
  position: fixed;
  top: 6rem;
  left: 0;
  height: 100%;
  width: ${(props) => (props.isOpen ? '12%' : '0')};
  background-color: #000820;
  color: white;
  padding: ${(props) => (props.isOpen ? '8px 8px 0 0' : '0px')};
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  align-items: left;

  &:hover,
  &:active,
  &.active {
    border-right: 3px solid var(--color-brand-100);
    transition: all 0.1s;
  }
`;

function Sidebar({ isOpen, activeMenu, role, onMenuSelect }) {
  return (
    <StyledSidebar isOpen={isOpen}>
      <MainNav
        isOpen={isOpen}
        activeMenu={activeMenu}
        role={role}
        onMenuSelect={onMenuSelect}
      />
    </StyledSidebar>
  );
}

export default Sidebar;
