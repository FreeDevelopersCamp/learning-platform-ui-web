import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useProfile } from '@/hooks/users/useProfile';

import ProfileHeader from './ui/ProfileHeader';
import ProfileWork from './ui/ProfileWork';
import ProfileCertifications from './ui/ProfileCertifications';
import ProfileCourses from './ui/ProfileCourses';
import ProfileWorkExperience from './ui/ProfileWorkExperience';
import ProfileEducation from './ui/ProfileEducation';
import ProfileAbout from './ui/ProfileAbout';
import ProfileFooter from './ui/ProfileFooter';
import Spinner from '../../ui/Spinner';

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username') || '';

  const { profile, profileLoading } = useProfile(username);

  if (profileLoading || !profile) return <Spinner />;

  return (
    <ProfilePageContainer>
      <ProfileHeader
        user={profile.user}
        accounts={profile.accounts}
        headline={profile.headline}
        state={profile.state}
        position={profile.position}
      />
      <ProfileAbout about={profile.about} />
      <ProfileWork work={profile.work} />
      <ProfileCertifications certifications={profile.certifications} />
      <ProfileCourses completedContent={profile.completedContent} />
      <ProfileWorkExperience experience={profile.experience} />
      <ProfileEducation education={profile.education} />
      <ProfileFooter />
    </ProfilePageContainer>
  );
};

export default ProfilePage;
