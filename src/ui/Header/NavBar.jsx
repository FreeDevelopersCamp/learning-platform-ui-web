import styled from 'styled-components';

const NavContainer = styled.nav`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 5rem;
  gap: 2rem;
`;

const NavItem = styled.li`
  /* margin: 15px 0; */
`;

const StyledLink = styled.a`
  color: var(--color-grey-800);
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;


  &:hover {
    color: var(--color-grey-600);
  }
`;

const NavBar = ({ hidden = false }) => {
  return (
    <NavContainer hidden={hidden}>
      <NavList>
        <NavItem>
          <StyledLink href="#">Home</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink href="#courses">Courses</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink href="#about">About</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink href="#instructor">Contact</StyledLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default NavBar;
