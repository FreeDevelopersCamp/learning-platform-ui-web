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
  color: var(--color-grey-800);
  padding: 0px 20px;
`;

const Header = ({ isAuth, user }) => {
  return (
    <HeaderContainer>
      <Title />
      <NavBar />
      <SearchBar />
      {!isAuth ? <AuthButtons /> : <Profile user={user} size="55" />}
    </HeaderContainer>
  );
};

export default Header;
