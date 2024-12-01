import styled from 'styled-components';
import MainNav from '../MainNav';

const StyledSidebar = styled.aside`
  width: ${(props) => (props.isOpen ? '20%' : '0px')};
  background-color: var(--color-grey-100);
  padding: ${(props) => (props.isOpen ? '0 0 3.2rem 0' : '0px')};
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  &:hover,
  &:active,
  &.active {
    border-right: 3px solid var(--color-brand-600);
    transition: all 0.1s;
  }
`;

function Sidebar({ isOpen, activeMenu, onMenuSelect }) {
  return (
    <StyledSidebar isOpen={isOpen}>
      <MainNav
        isOpen={isOpen}
        activeMenu={activeMenu}
        onMenuSelect={onMenuSelect}
      />
    </StyledSidebar>
  );
}

export default Sidebar;
