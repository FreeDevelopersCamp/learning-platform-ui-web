// MainPortfolioComponent.js
import styled from 'styled-components';
import ProfileHeader from './ui/ProfileHeader';
import ProfileWork from './ui/ProfileWork';
import ProfileCertifications from './ui/ProfileCertifications';
import ProfileCourses from './ui/ProfileCourses';
import ProfileWorkExperience from './ui/ProfileWorkExperience';
import ProfileEducation from './ui/ProfileEducation';
import ProfileAbout from './ui/ProfileAbout';
import ProfileFooter from './ui/ProfileFooter';

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const ProfilePage = () => {
  return (
    <ProfilePageContainer>
      <ProfileHeader />
      <ProfileAbout />
      <ProfileWork />
      <ProfileCertifications />
      <ProfileCourses />
      <ProfileWorkExperience />
      <ProfileEducation />
      <ProfileFooter />

      {/* {userData && <ProfileCard user={userData} />} */}
      {/* Render other components here */}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
