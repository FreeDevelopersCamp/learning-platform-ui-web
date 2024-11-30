import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const NavContainer = styled.nav`
  flex: 1;
  margin: 0 0 5px 2.5%;
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
  font-weight: 600;
  font-size: 18px;

  &:hover {
    color: var(--color-grey-500);
  }
`;

// If you have external links, you can define a separate styled component
const ExternalLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;

  &:hover {
    color: #555; /* Optional: Add a hover effect */
  }
`;

const NavBar = () => {
  return (
    <NavContainer>
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
        {/* Example of an external link */}
        {/* <NavItem>
          <ExternalLink href="https://www.freeDeveloperCamp.com" target="_blank" rel="noopener noreferrer">
            Free Developer Camp
          </ExternalLink>
        </NavItem> */}
      </NavList>
    </NavContainer>
  );
};

export default NavBar;
