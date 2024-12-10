import styled from 'styled-components';
import MainNav from '../MainNav';

const StyledSidebar = styled.aside`
  width: ${(props) => (props.isOpen ? '12%' : '0px')};
  /* background-color: #000820; */
  background-color: var(--color-mutedblue-900);
  color: white;
  padding: ${(props) => (props.isOpen ? '8px 8px 0 0' : '0px')};
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  align-items: left;
  /* gap: 1rem; */

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
