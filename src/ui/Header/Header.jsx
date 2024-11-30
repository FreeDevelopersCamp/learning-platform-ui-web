import React from "react";
import styled from "styled-components";

import Title from "./Title";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-100);
  color: var(--color-grey-800);
  padding: 0px 20px;
`;

// Component
const Header = () => {
  return (
    <HeaderContainer>
      <Title />
      <NavBar />
      <SearchBar />
      <AuthButtons />
    </HeaderContainer>
  );
};

export default Header;
