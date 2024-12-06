import styled from 'styled-components';

import Title from './Title';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import Profile from '../Profile/Profile';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-100);
  color: var(--color-grey-800);
  padding: 0px 20px;
`;

// Component
const Header = ({ username, name }) => {
  return (
    <HeaderContainer>
      <Title />
      <NavBar />
      <SearchBar />
      {!username ? (
        <AuthButtons />
      ) : (
        <Profile username={username} name={name} size="55" />
      )}
    </HeaderContainer>
  );
};

export default Header;
