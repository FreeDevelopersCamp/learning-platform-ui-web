import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  flex: 1;
  margin: 0 0 5px 2.5%;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 10px 15px 0;
`;

const StyledLink = styled(Link)`
  color: var(--color-grey-800);
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;

  font-family: 'Poppins', sans-serif;

  &:hover {
    color: var(--color-grey-500);
  }
`;

const NavBar = ({ hidden = false }) => {
  return (
    <NavContainer hidden={hidden}>
      <NavList>
        <NavItem>
          <StyledLink to="/">Home</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/courses">Courses</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/about">About</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/contact">Contact</StyledLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default NavBar;
