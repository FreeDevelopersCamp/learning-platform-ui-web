// MainPortfolioComponent.js
import styled from 'styled-components';
import ProfileHeader from './ui/ProfileHeader';

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePage = () => {
  return (
    <ProfilePageContainer>
      <ProfileHeader />
      {/* {userData && <ProfileCard user={userData} />} */}
      {/* Render other components here */}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
